import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BertTokenizer, BertForSequenceClassification
import torch
from json import dumps
from llamaapi import LlamaAPI

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NumpyEncoder, self).default(obj)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})   # Enable CORS

# Initialize the Llama API
llama = LlamaAPI("LL-I1DzCbApeYAXATLa2xHjuBgsZoedmFUPPTfuQ49zXHnJnepZEskN2NaOEClxvgt0")

# Load the models and tokenizers once at startup
model_path_stress = '/mnt/data/mental_health_model'
model_stress = BertForSequenceClassification.from_pretrained(model_path_stress)
tokenizer_stress = BertTokenizer.from_pretrained(model_path_stress)
model_stress = model_stress.to('cuda') if torch.cuda.is_available() else model_stress.to('cpu')

model_path_multiclass = 'depression_multiclass_model'
model_multiclass = BertForSequenceClassification.from_pretrained(model_path_multiclass)
tokenizer_multiclass = BertTokenizer.from_pretrained(model_path_multiclass)
model_multiclass = model_multiclass.to('cuda') if torch.cuda.is_available() else model_multiclass.to('cpu')

def predict_stress(text):
    encoding = tokenizer_stress.encode_plus(
        text,
        add_special_tokens=True,
        max_length=128,
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt',
    )
    input_ids = encoding['input_ids'].to(model_stress.device)
    attention_mask = encoding['attention_mask'].to(model_stress.device)

    with torch.no_grad():
        outputs = model_stress(input_ids, attention_mask=attention_mask)
    logits = outputs.logits
    probabilities = torch.nn.functional.softmax(logits, dim=1)
    confidence, prediction = torch.max(probabilities, dim=1)

    disorder = "Stressed" if prediction.item() == 1 else "Not Stressed"
    severity = float(confidence.item()) * 10
    return disorder, severity

def predict_multiclass(text):
    encoding = tokenizer_multiclass.encode_plus(
        text,
        add_special_tokens=True,
        max_length=128,
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt',
    )
    input_ids = encoding['input_ids'].to(model_multiclass.device)
    attention_mask = encoding['attention_mask'].to(model_multiclass.device)

    with torch.no_grad():
        outputs = model_multiclass(input_ids, attention_mask=attention_mask)
    logits = outputs.logits
    probabilities = torch.nn.functional.softmax(logits, dim=1)
    confidence, prediction = torch.max(probabilities, dim=1)

    # Map the prediction to the respective label
    labels = ['minimum', 'mild', 'moderate', 'severe']
    disorder = labels[prediction.item()]
    severity = float(confidence.item()) * 10
    return disorder, severity

def detect_mental_illness(text):
    api_request_json = {
        "messages": [
            {"role": "user", "content": f"Identify any mental disorders present in the following text & return in one word. If none are present, return 'No mental disorder found.'.\n\nText: {text}\n\nMental Illnesses:"}
        ],
        "stream": False
    }
    response = llama.run(api_request_json)
    
    # Print the status code and response text for debugging
    print(f"Status Code: {response.status_code}")
    print(f"Response Text: {response.text}")

    # Attempt to parse the response as JSON
    try:
        response_json = response.json()
        mental_illness = response_json['choices'][0]['message']['content'].strip()
        if mental_illness.lower() == 'null':
            return None
        return mental_illness
    except json.JSONDecodeError:
        # Handle the case where the response is not JSON
        print("Failed to decode JSON response")
        return None

@app.route('/predict/stress', methods=['POST'])
def predict_stress_route():
    data = request.json
    text = data['text']
    disorder, severity = predict_stress(text)
    response = {'Disorder Present': disorder, 'Severity Score': severity}
    return app.response_class(response=dumps(response, cls=NumpyEncoder), mimetype='application/json')

@app.route('/predict/multiclass', methods=['POST'])
def predict_multiclass_route():
    data = request.json
    text = data['text']
    disorder, severity = predict_multiclass(text)
    response = {'Disorder': disorder, 'Severity Score': severity}
    return app.response_class(response=dumps(response, cls=NumpyEncoder), mimetype='application/json')

@app.route('/predict/mental', methods=['POST'])
def detect_mental_illness_route():
    data = request.json
    text = data['text']
    mental_illness = detect_mental_illness(text)
    response = {'mental_illness': mental_illness}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)

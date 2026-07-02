import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import './FeedbackPopup.css'; // Ensure you have corresponding CSS for styling

const FeedbackPopup = ({ userInput, userId, initialStressLabel, initialDepressionSeverity, initialMentalIllness, onSubmit, onSkip }) => {
  const [stressLabel, setStressLabel] = useState(initialStressLabel || 'stressed');
  const [depressionSeverity, setDepressionSeverity] = useState(initialDepressionSeverity || 'mild');
  const [mentalIllness, setMentalIllness] = useState(initialMentalIllness || 'Anxiety'); // Default to 'Anxiety'
  const [isAgreed, setIsAgreed] = useState(false);

  const handleStressLabelChange = (event) => {
    setStressLabel(event.target.value);
  };

  const handleDepressionSeverityChange = (event) => {
    setDepressionSeverity(event.target.value);
  };

  const handleMentalIllnessChange = (event) => {
    setMentalIllness(event.target.value);
  };

  const handleAgreementChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handleSubmit = async () => {
    if (isAgreed) {
      const db = getFirestore();
      await addDoc(collection(db, 'feedback'), {
        userInput,
        stressLabel,
        depressionSeverity,
        mentalIllness,
        timestamp: new Date()
      });
      onSubmit();
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Feedback</h2>
        <h4>Your input :</h4>
        <p>{userInput}</p>
        <div className="form-group">
          <label htmlFor="stressLabel">Stress Label:</label>
          <select
            id="stressLabel"
            className="form-control"
            value={stressLabel}
            onChange={handleStressLabelChange}
          >
            <option value="stressed">Stressed</option>
            <option value="not stressed">Not Stressed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="depressionSeverity">Depression Severity:</label>
          <select
            id="depressionSeverity"
            className="form-control"
            value={depressionSeverity}
            onChange={handleDepressionSeverityChange}
          >
            <option value="mild">Mild</option>
            <option value="minimum">Minimum</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mentalIllness">Actual Label: </label>
          <select
            id="mentalIllness"
            className="form-control"
            value={mentalIllness}
            onChange={handleMentalIllnessChange}
          >
            <option value="Anxiety">Anxiety</option>
            <option value="Depression">Depression</option>
            <option value="PTSD">PTSD</option>
            <option value="OCD">OCD</option>
            <option value="Schizophrenia">Schizophrenia</option>
            <option value="Suicide">Suicide</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleAgreementChange}
            />
            * I agree that my information will be stored and reviewed for further training the model.
          </label>
        </div>
        <div className="button-group">
          <button className="btn-custom" onClick={handleSubmit} disabled={!isAgreed}>Submit</button>
          <button className="btn-custom" onClick={onSkip}>Skip</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;

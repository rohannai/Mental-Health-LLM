import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from 'chart.js';
import Navbar1 from './Navbar';
import Loader from './Loader'; // Import the Loader component
import FeedbackPopup from './FeedbackPopup'; // Import the FeedbackPopup component
import './Axios.css'; // Import custom CSS

// Register necessary components
ChartJS.register(ArcElement, Tooltip);

const MentalHealthPredictor = () => {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [multiclassPrediction, setMulticlassPrediction] = useState(null);
  const [mentalIllness, setMentalIllness] = useState(null);
  const [recommendations, setRecommendations] = useState(null); // Add recommendations state
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true); 
    setLoading(true); 

    setTimeout(async () => {
      try {
        const binaryResponse = await axios.post('http://localhost:5500/predict/stress', { text });
        setPrediction(binaryResponse.data);

        // Fetch multiclass model prediction
        const multiclassResponse = await axios.post('http://localhost:5500/predict/multiclass', { text });
        setMulticlassPrediction(multiclassResponse.data);

        // Fetch mental illness detection
        const mentalIllnessResponse = await axios.post('http://localhost:5500/predict/mental', { text });
        setMentalIllness(mentalIllnessResponse.data.mental_illness);

        // Fetch recommendations
        const recommendationsResponse = await axios.post('http://localhost:5500/recommendations', { mental_disorder: mentalIllnessResponse.data.mental_illness });
        setRecommendations(recommendationsResponse.data.recommendations);

        setError(null);
      } catch (err) {
        console.error('Error fetching predictions:', err);
        setError('Failed to fetch predictions. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    }, 3000); // Set the loader to show for 3 seconds
  };

  const handleRefresh = () => {
    if (user) {
      setShowPopup(true); // Show the feedback popup
    } else {
      window.scrollTo(0, 0); // Scroll to top
      window.location.reload(); // Refresh the page
      setShowPopup(false);
    }
  };

  const handlePopupSubmit = () => {
    setShowPopup(false);
    window.scrollTo(0, 0); // Scroll to top
    window.location.reload(); // Refresh the page
  };

  const handlePopupSkip = () => {
    setShowPopup(false);
    window.scrollTo(0, 0); // Scroll to top
    window.location.reload(); // Refresh the page
  };

  const pieData = prediction ? {
    labels: ['Confidence Score'],
    datasets: [{
      data: [prediction['Severity Score'] * 10, 100 - prediction['Severity Score'] * 10],
      backgroundColor: ['#30638E', '#ddd'],
    }],
  } : null;

  return (
    <div className='axios'>
      <Navbar1 />
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="textInput" className="form-label">
              <h1>How are you feeling today?</h1>
            </label>
            <textarea
              id="textInput"
              className="form-control"
              value={text}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
          {!submitted && (
            <button type="submit" className="btn-custom">Predict Now</button>
          )}
        </form>
        {error && <div className="alert alert-danger mt-4">{error}</div>}
        {loading ? ( // Show loader while loading
          <Loader />
        ) : (
          <>
            {prediction && (
              <div className="mt-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-custom">
                      <div className="card-body-custom">
                        <h5 className="card-title-custom">Stress Detector</h5>
                        <p className="card-text-custom">{prediction['Disorder Present']}</p>
                      </div>
                    </div>
                    {prediction && (
                      <div className="card-custom mt-4">
                        <div className="card-body-custom">
                          <h5 className="card-title-custom">Confidence Score</h5>
                          <p className="card-text-custom">
                            {prediction['Severity Score'] !== undefined 
                              ? prediction['Severity Score'].toFixed(2) 
                              : 'Not available'}
                          </p>
                          {pieData && (
                            <div className="chart-container" style={{ maxWidth: '200px', margin: '0 auto' }}>
                              <Pie data={pieData} width={200} height={200} />
                            </div>
                          )}
                          <p className='confi-text'>
                            * Confidence Score provides insights into how certain the model is about its individual predictions
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="card-custom">
                      <div className="card-body-custom">
                        <h5 className="card-title-custom">Recommendations</h5>
                        <p className="card-text-custom">
                          {recommendations || "No recommendations available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {mentalIllness && (
              <div className="mt-4">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-custom">
                      <div className="card-body-custom">
                        <h5 className="card-title-custom">Mental Illness Detection</h5>
                        <p className="card-text-custom">
                          Detected mental illness: {mentalIllness || "No specific mental illness detected."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {multiclassPrediction && (
              <div className="mt-4">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-custom">
                      <div className="card-body-custom">
                        <h5 className="card-title-custom">Depression Level</h5>
                        <p className="card-text-custom">
                          Your text was found to contain a {multiclassPrediction['Disorder']} level of depression.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(prediction || multiclassPrediction || mentalIllness) && (
              <div className="mt-4">
                <button className="btn-custom" onClick={handleRefresh}>End Session</button>
              </div>
            )}
          </>
        )}
      </div>
      {showPopup && (
        <FeedbackPopup
          userInput={text}
          initialStressLabel={prediction ? prediction['Disorder Present'] : ''}
          initialDepressionSeverity={multiclassPrediction ? multiclassPrediction['Disorder'] : ''}
          initialMentalIllness={mentalIllness}
          onSubmit={handlePopupSubmit}
          onSkip={handlePopupSkip}
        />
      )}
    </div>
  );
};

export default MentalHealthPredictor;

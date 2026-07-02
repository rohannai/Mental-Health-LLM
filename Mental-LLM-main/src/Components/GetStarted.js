// src/components/GetStarted.js
import React, { useState } from 'react';
import Navbar1 from './Navbar';

export const GetStarted = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="get-back">
        <div className="container mt-4">
          <h1>Express yourself here </h1>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            Send
          </button>
          {response && <div className="mt-3">{response}</div>}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

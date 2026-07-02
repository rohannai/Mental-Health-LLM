// src/components/SignUp.js
import React, { useState } from 'react';
import Navbar1 from './Navbar';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = '/axios'; // Redirect to the dashboard or home page after sign-up
    } catch (error) {
      console.error("Error signing up with email and password", error);
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = '/axios'; // Redirect to the dashboard or home page after Google sign-up
    } catch (error) {
      console.error("Error signing up with Google", error);
      alert(error.message);
    }
  };

  return (
    <div className='signup-back'>
      <Navbar1 />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 sign-in-box">
          <h3 className="card-title text-center">Sign Up</h3>
          <form onSubmit={handleSignUp}>
            <div className="form-main">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              <button
                type="button"
                className="btn btn-block mt-3"
                onClick={handleGoogleSignUp}
              >
                Sign Up with Google
              </button>
              <div>Already have an account? <Link to="/login">Sign In</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

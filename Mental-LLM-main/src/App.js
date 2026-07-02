import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import { AuthProvider } from "./contexts/AuthContext";
import Land from './Components/Land';
import Faq from './Components/Faq';
import { GetStarted } from './Components/GetStarted';
import MoreInfo from './Components/MoreInfo';
import SignUp from './Components/SignUp';
import MentalHealthPredictor from './Components/Axios';
import FeedbackPopup from './Components/FeedbackPopup';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/f" element={<FeedbackPopup />} />
        <Route path='/about' element ={<About/>}/>
        <Route path='/more-info' element ={<MoreInfo/>}/>
        <Route path='/faqs' element ={<Faq/>}/>
        <Route path="/login" element={<Land />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/axios" element={<MentalHealthPredictor />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/" element={
            <Home />
        } />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
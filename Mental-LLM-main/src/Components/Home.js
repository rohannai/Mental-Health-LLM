import React from 'react'
import Navbar1 from './Navbar'
import mentalhealth from '../mental.json';
import Lottie from "lottie-react"
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/axios'); 
  };
  return (
    <div className='home-poly'>
      <Navbar1/>
    <div class='row'>
        <div class='col'>
        <div className='text-section'>
        <motion.div 
        className='main-heading'
        initial={{ opacity: 0.2, scale: 0.8 }}
        whileInView={{ opacity: 1, scale : 1 }}
        transition={{ duration: 2 }}
        >
          From Text to Therapy
        </motion.div>
        <motion.div
         className='home-text'
         initial={{ opacity: 0.2, x:-75}}
         whileInView={{ opacity: 1, x:0}}
         transition={{ duration: 2 }}
         >
          Your Path to Mental Wellbeing Starts Here.
        </motion.div>
        <button className='button' onClick={handleButtonClick}>Get started</button>
        </div>
        </div>
        <div class='col'>
          <Lottie animationData={mentalhealth}/>
        </div>
        
    </div>
    </div>
  )
}

export default Home
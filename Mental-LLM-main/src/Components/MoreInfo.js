import React, { useState } from 'react';
import './AnimatedCards.css';
import Navbar1 from './Navbar';
import Popup from './Popup';
import data from '../data2.json';

const AnimatedCards = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  const getImagePath = (imageName) => {
    try {
      return require(`../Assets/${imageName}`);
    } catch (err) {
      console.error(`Image not found: ${imageName}`);
      return null;
    }
  };

  return (
    <div className='more-info-back'>
      <Navbar1 />
      <h1 className='know-text'>Some Common Mental Health Issues </h1>
      <div className="grid-container">
        {
          data.map((item) => (
            <div key={item.id} className='section-info' onClick={() => handleCardClick(item)}>
              <div className='img-container'>
                <img src={getImagePath(item.image)} alt={item.title} />
              </div>
              <h2>{item.title}</h2>
            </div>
          ))
        }
      </div>
      <Popup data={selectedItem} onClose={closePopup} />
    </div>
  );
}

export default AnimatedCards;

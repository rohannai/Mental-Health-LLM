import React from 'react';
import './Popup.css';
import { IoMdCloseCircleOutline } from "react-icons/io";


const formatText = (text) => {
  // Split text by lines
  const lines = text.split('\n');

  // Process each line for bullet points
  return lines.map(line => {
    if (line.startsWith('- ')) {
      return `<li>${line.substring(2)}</li>`;
    }
    return line;
  }).join('<br />').replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
};

const Popup = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><IoMdCloseCircleOutline /></button>
        <h2>{data.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: formatText(data.description) }} />
      </div>
    </div>
  );
}

export default Popup;

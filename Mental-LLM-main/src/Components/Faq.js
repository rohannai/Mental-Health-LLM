import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './Navbar';
import faqData from '../faqData.json';
import { FaAngleDown } from "react-icons/fa";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='faq-back'>
      <Navbar1 />
      <div className="container mt-4">
        <h1 className='faq-heading'>Frequently Asked Questions</h1>
        {faqData.map((item, index) => (
          <div key={index} className="mb-3">
            <button
              className="faq-button"
              type="button"
              onClick={() => toggleAnswer(index)}
            >
              {item.question} <FaAngleDown/>
            </button>
            <div className={`collapse ${openIndex === index ? 'show' : ''}`}>
              <div className="card card-body">
                <span dangerouslySetInnerHTML={{ __html: item.answer.replace(/\n/g, '<br />') }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;

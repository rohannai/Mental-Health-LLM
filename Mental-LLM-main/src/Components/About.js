import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar1 from './Navbar';
import animate from '../about.json'
import Lottie from 'lottie-react';

function AboutUs() {
  return (
    <div>
      <Navbar1/>
    <Container className="my-5">
      <Row>
        <Col md={6} className='about-image-container'>
        <Lottie animationData={animate} />
        </Col>
        <Col md={6}>
        <div className='glass-box'>
        <h2 className='about-heading'>About Us</h2>
          <p className='about-text'>
            At Unwire, our primary mission is to revolutionize mental health care by leveraging the power of advanced technology. In an era where mental well-being is of utmost importance, we recognized a significant challenge: understanding and predicting the mental health of individuals through their written words. With the growing prevalence of online communication, we saw an opportunity to harness this data to provide meaningful insights into mental health.
          </p>
          <p className='about-text'>
            To address this challenge, we embarked on a journey to develop an innovative solution that combines the strengths of large language models (LLMs) and machine learning (ML). By training these advanced models, we have created a system capable of analyzing user-submitted text to accurately predict their mental health state. Our approach integrates cutting-edge AI technology with rigorous data science methods to ensure reliable, empathetic, and actionable insights.
          </p>
          <p className='about-text'>
            Through our platform, we aim to empower individuals with a deeper understanding of their mental well-being, offering a unique tool that bridges the gap between technology and personal health. We are committed to continuous improvement and innovation, driven by our belief that everyone deserves access to effective mental health support. Join us on this transformative journey to better mental health, one text at a time.
          </p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AboutUs;

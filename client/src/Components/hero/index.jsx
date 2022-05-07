import React from 'react';
import './style.css';
import heroImage from './hero.jpg';

function Hero() {
  return (
    <div className="hero-section">
      <img className="hero-image" src={heroImage} alt="heroImage" />
      <p className="welcome-message">Enjoy your visit to our INSTAMART</p>
    </div>
  );
}

export default Hero;

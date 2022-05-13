import React from 'react';
import './style.css';
// import heroImage from './hero.jpg';

function Hero() {
  return (
    <div className="hero-section">
      {/* <img className="hero-image" src={heroImage} alt="heroImage" /> */}
      <p className="welcome-message">
        Enjoy your visit to our
        {' '}
        <span className="app-title-hero">INSTAMART</span>
      </p>
    </div>
  );
}

export default Hero;

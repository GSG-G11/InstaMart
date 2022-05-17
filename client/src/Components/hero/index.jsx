import React from 'react';
import './style.css';

function Hero() {
  return (
    <div className="hero-section">
      <img
        className="hero-image"
        src="https://wallpaperaccess.com/full/271714.jpg"
        alt="heroImage"
      />
      <p className="welcome-message">
        Don&apos;t miss our amazing
        <br />
        daily deals
      </p>
    </div>
  );
}

export default Hero;

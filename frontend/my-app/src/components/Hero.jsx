import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Original and Quality</h1>
          <h2 className="hero-subtitle">Electric Products</h2>
          <p className="hero-text">
            Discover our wide range of high-quality tech products. From the
            latest gadgets to essential electronics, we've got everything you
            need for your tech requirements.
          </p>
          <Link to="/shop" className="btn-primary inline-block">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

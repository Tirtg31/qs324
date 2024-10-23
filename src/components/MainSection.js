// src/components/MainSection.js
import React from "react";
import "./MainSection.css";

function MainSection() {
  return (
    <section className="main-section">
      <div className="content">
        <h1>Welcome to Our App</h1>
        <p>Your go-to solution for [purpose of app].</p>
        <button className="cta-button">Get Started</button>
      </div>
    </section>
  );
}

export default MainSection;

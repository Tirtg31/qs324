// src/components/Header.js
import React from "react";
import "./Header.css"; // Add CSS styles for the header

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

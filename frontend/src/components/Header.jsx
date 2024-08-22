import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar-fixed">
      <nav className="blue">
        <div className="nav-wrapper container">
          <NavLink to="/" className="brand-logo">lrnr</NavLink>
          <a href="#" className="sidenav-trigger right" onClick={toggleMenu}>
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className={`right hide-on-med-and-down ${isOpen ? 'show-menu' : ''}`}>
            <li><NavLink to="/account">Account</NavLink></li>
            <li><NavLink to="/quiz-generator">Quiz Generator</NavLink></li>
          </ul>
          {isOpen && (
            <ul className="sidenav">
              <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
              <li><NavLink to="/account" onClick={toggleMenu}>Account</NavLink></li>
              <li><NavLink to="/quiz-generator" onClick={toggleMenu}>Quiz Generator</NavLink></li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar-fixed">
      <nav className="blue">
        <div className="nav-wrapper container">
          <NavLink to="/" className="brand-logo">lrnr</NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/account">Account</NavLink></li>
            <li><NavLink  to="/quiz-generator">Quiz Generator</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

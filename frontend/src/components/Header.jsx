import React from 'react';

const Header = () => {
  return (
    <header className="navbar-fixed">
      <nav className="blue">
        <div className="nav-wrapper container">
          <a href="/" className="brand-logo">lrnr</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/account">Account</a></li>
            <li><a href="/quiz-generator">Quiz Generator</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

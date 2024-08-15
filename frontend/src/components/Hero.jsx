import React from 'react';
import Logo from '../assets/logo.png';

const HeroSection = () => {
  return (
    <section className="section center-align">
      <img src={Logo} alt="lrnr logo" className="responsive-img" style={{ maxWidth: '35%' }} />
      <h5>Your guided path to programming enlightenment</h5>
      <a href="/quiz-generator" className="btn-large teal">Begin Journey</a>
    </section>
  );
};

export default HeroSection;

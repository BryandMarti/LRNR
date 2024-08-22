import React from 'react';
import Logo from '../assets/logo.png';

const HeroSection = () => {
  return (
    <section className="section center-align">
      <img src={Logo} alt="lrnr logo" className="responsive-img" style={{ maxWidth: '27%', marginTop: '3.5rem' }} />
      <h5>Your guided path to programming enlightenment</h5>
      <a href="/quiz-generator" className="btn-large teal" style={{marginTop: '2.5rem'}}>Begin Journey</a>
    </section>
  );
};

export default HeroSection;

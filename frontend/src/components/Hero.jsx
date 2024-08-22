import React from 'react';
import Logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="section center-align">
      <img src={Logo} alt="lrnr logo" className="responsive-img" style={{ maxWidth: '27%', marginTop: '3.5rem' }} />
      <h5>Your guided path to programming enlightenment</h5>
      <NavLink to="/quiz-generator" className="btn-large teal" style={{marginTop: '2.5rem'}}>Begin Journey</NavLink>
    </section>
  );
};

export default HeroSection;

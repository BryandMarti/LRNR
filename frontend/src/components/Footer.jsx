import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer blue absolute" style={{marginTop: '8rem'}}>
      <div className="container" style={{width: '80%'}}>
        <div className="row">
          <div className="col l6 s12">
            <p className="white-text text-lighten-4">Embrace the power of our app and unlock the secrets of the universe, one quiz at a time.
            As I always say, 'Yesterday is history, tomorrow is a mystery, but today is a gift. that iis why is called the present'</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><NavLink className="grey-text text-lighten-3" to="/">Home</NavLink></li>
              <li><NavLink className="grey-text text-lighten-3" to="/quiz-generator">Quiz Generator</NavLink></li>
              <li><NavLink className="grey-text text-lighten-3" to="/account">Account</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container" style={{width: '80%'}}>
          Made by <a className="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

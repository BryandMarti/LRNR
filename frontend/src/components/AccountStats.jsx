import React from 'react';

const AccountStats = () => {
  return (
    <section className="section container" style={{ marginBottom: '225px' }}>
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block center">
            <h2 style={{ color: '#1ee9b6', fontSize: '48px' }}>
              <i className="material-icons">whatshot</i>
            </h2>
            <h5 style={{ color: 'black', fontSize: '24px' }}>Streak</h5>
            <p className="left" style={{ color: 'black', textAlign: 'center', fontSize: '16px', lineHeight: '1.5' }}>
              You have a streak of 5 days!
            </p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block center">
            <h2 style={{ color: '#1ee9b6', fontSize: '48px' }}>
              <i className="material-icons">view_list</i>
            </h2>
            <h5 style={{ color: 'black', fontSize: '24px' }}>Platinum Quizzes</h5>
            <p className="left" style={{ color: 'black', textAlign: 'center', fontSize: '16px', lineHeight: '1.5' }}>
              golang - intermediate
              <br /> 
              Javascript - beginner
              <br />
              AWS - beginner
            </p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block center">
            <h2 style={{ color: '#1ee9b6', fontSize: '48px' }}>
              <i className="material-icons">person</i>
            </h2>
            <h5 style={{ color: 'black', fontSize: '24px' }}>Lrnr Level: 2</h5>
            <p style={{ color: 'black', textAlign: 'center', fontSize: '16px', lineHeight: '1.5' }}>
              150/200 xp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountStats;

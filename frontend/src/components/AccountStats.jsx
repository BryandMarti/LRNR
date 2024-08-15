import React from 'react';

const AccountStats = () => {
  return (
    <section className="section container" style={{marginBottom: '225px'}}>
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block center">
            <h2 className="teal-text" ><i className="material-icons" >whatshot</i></h2>
            <h5 style={{color: 'black'}}>Streak</h5>
            <p className='left' style={{color: 'black'}}>You have a streak of 5 days!</p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block center">
            <h2 className="teal-text"><i className="material-icons">view_list</i></h2>
            <h5 style={{color: 'black'}}>Platinum Quizzes</h5>
            <p className='left' style={{color: 'black', textAlign: 'left'}}>golang - intermediate<br />Javascript - beginner<br />AWS - beginner</p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block center">
            <h2 className="teal-text"><i className="material-icons">person</i></h2>
            <h5 style={{color: 'black'}}>Lrnr Level: 2</h5>
            <p style={{color: 'black'}}>150/200 xp</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountStats;

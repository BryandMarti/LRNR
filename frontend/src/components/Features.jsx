import React from 'react';

const Features = () => {
  return (
    <section className="section container" style={{width: '95%'}}>
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 style={{ color: '#1ee9b6', fontSize: '48px' , textAlign: 'center' }} ><i className="material-icons">flash_on</i></h2>
            <h5 className="center" style={{color: 'black'}}>Personalized Quizzes</h5>
            <p className="light" style={{padding: '15px', color: 'black'}}>Greetings, young padawan. Are you ready to embark on a journey of personalized enlightenment through the art of coding? Our app, can create custom quizzes that align with your coding skills and interests. Whether you are a novice or a master, our system can generate questions that will test your proficiency in programming languages, tools, and concepts </p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 style={{ color: '#1ee9b6', fontSize: '48px' , textAlign: 'center' }} ><i className="material-icons">attach_money</i></h2>
            <h5 className="center" style={{color: 'black'}}>Rewarding</h5>
            <p className="light" style={{padding: '15px', color: 'black'}}>Our app is designed to be both challenging and rewarding, so you can learn new concepts while enjoying the process. With our personalized quiz app, you can track your progress, compete with your peers, and discover new areas of expertise. The journey of a thousand lines of code begins with a single keystroke</p>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="icon-block" >
            <h2 style={{ color: '#1ee9b6', fontSize: '48px' , textAlign: 'center' }} ><i className="material-icons">person</i>
            </h2>
            <h5 className="center" style={{color: 'black'}}>Personal SME</h5>
            <p className="light" style={{padding: '15px', color: 'black'}}>Welcome to the path of knowledge. Our app is like having a personal subject matter expert at your side, guiding you on your journey towards wisdom</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [expertise, setExpertise] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [styleOfQuestions, setStyleOfQuestions] = useState('normal');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  // const [questionOptions, setQuestionOptions] = useState([]);
  const [quizObject, setQuizObject] = useState([]);

  const topics = ['golang', 'aws', 'javascript', 'CI/CD', 'home gardens', 'coffee', 'finger foods'];
  const expertiseLevels = ['novice', 'intermediate', 'expert'];
  const questionNumbers = [5, 10, 15];
  const questionStyles = ['master oogway', "1940's gangster", "like I'm an 8 year old", 'normal', 'jedi', 'captain jack sparrow', 'matthew mcconaughey'];

  
  const handleSubmit = async ()  => {
    
    const response = await fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: `${topic}, ${expertise}, ${questionCount}, ${styleOfQuestions}` }),
    });

    const data = await response.json();
    const quizObj = await JSON.parse(data.result);
    setQuizObject(quizObj.quiz)
    setQuizQuestions(quizObj.quiz.questions)
    setQuestionOptions(quizObj.quiz.options)
    // console.log(quizQuestions);
  }
  
  useEffect(() => {
    console.log(quizObject);
    console.log(quizQuestions);
    // console.log(quizQuestions[0].options);
  }, [quizObject, quizQuestions])
  

return (
    <div className="container" style={{display: 'contents'}}>
      <Header />
      <h3>Quiz Generation Options</h3>
      <div className="row">
          <label style={{color: 'black'}}>Topic</label>
        <div className="input-field col s12">
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="browser-default" style={{color: 'black'}}>
            <option value="" disabled>Select a topic</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
          <label style={{color: 'black'}}>Expertise</label>
        <div className="input-field col s12">
          <select value={expertise} onChange={(e) => setExpertise(e.target.value)} className="browser-default" style={{color: 'black'}}>
            <option value="" disabled>Select expertise</option>
            {expertiseLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
          <label style={{color: 'black'}}>Number of Questions</label>
        <div className="input-field col s12">
          <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} className="browser-default" style={{color: 'black'}}>
            {questionNumbers.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
           <label style={{color: 'black'}}>Style of Questions</label>
        <div className="input-field col s12">
          <select value={styleOfQuestions} onChange={(e) => setStyleOfQuestions(e.target.value)} className="browser-default" style={{color: 'black'}}>
            {questionStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn green" onClick={handleSubmit}>Generate Quiz</button>
      {/* quizTitle && (
        <div className="quiz-summary">
          <h4>{quizTitle}</h4>
          <p>{quizDescription}</p>
          <ul>
            {quizQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      ) */}
      {quizQuestions.map((questions) => (
        <>
        <h1 key={questions}>{questions.question}</h1>
        <h1>{questions.correctAnswer}</h1>
        </>
      ))}
      <Footer />
    </div>
  );
};

export default QuizGenerator;

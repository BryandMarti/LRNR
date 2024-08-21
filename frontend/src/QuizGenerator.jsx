
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import QuizPageCSS from './quizPage.module.css'
const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [expertise, setExpertise] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [styleOfQuestions, setStyleOfQuestions] = useState('normal');
  const navigate = useNavigate();

  const topics = ['golang', 'aws', 'javascript', 'CI/CD', 'home gardens', 'coffee', 'finger foods'];
  const expertiseLevels = ['novice', 'intermediate', 'expert'];
  const questionNumbers = [5, 10, 15];
  const questionStyles = ['master oogway', "1940's gangster", "like I'm an 8 year old", 'normal', 'jedi', 'captain jack sparrow', 'matthew mcconaughey'];


    // initialize materialize elements
    useEffect(() => {

      const M = window.M; 
      M.FormSelect.init(document.querySelectorAll('select'));
    }, []);
  


  const handleSubmit = async () => {
    try {
      const response = await fetch('https://lrnr-quiz-backend.vercel.app/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: `${topic}, ${expertise}, ${questionCount}, ${styleOfQuestions}` }),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.result && data.result.quiz) {
        navigate('/quiz-page', { state: { quiz: data.result.quiz } });
      } else {
        throw new Error('Quiz data is not in the expected format.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('There was an issue generating the quiz. Please try again later.');
    }
  };
  
  

 
  return (
    <div className="container" style={{display: 'contents'}}>
   
  <div className={QuizPageCSS.contentContainer}>
  <h3>Quiz Generation Options</h3>
  <div className="row">
        <label style={{color: 'black'}}>Topic</label>
        <div className="input-field col s12">
          <select value={topic} onChange={(e) => setTopic(e.target.value)} style={{color: 'black'}}>
            <option value="" disabled></option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          <label></label>
        </div>
      </div>
      <div className="row">
        <label style={{color: 'black'}}>Expertise</label>
        <div className="input-field col s12">
          <select value={expertise} onChange={(e) => setExpertise(e.target.value)} style={{color: 'black'}}>
            <option value="" disabled></option>
            {expertiseLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <label></label>
        </div>
      </div>
      <div className="row">
        <label style={{color: 'black'}}>Number of Questions</label>
        <div className="input-field col s12">
          <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} style={{color: 'black'}}>
            {questionNumbers.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <label></label>
        </div>
      </div>
      <div className="row">
        <label style={{color: 'black'}}>Style of Questions</label>
        <div className="input-field col s12">
          <select value={styleOfQuestions} onChange={(e) => setStyleOfQuestions(e.target.value)} style={{color: 'black'}}>
            {questionStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
          <label></label>
        </div>
      </div>
   
  <button className="waves-effect waves-light btn" onClick={handleSubmit}>Submit</button>
  </div>
   
      
    </div>
  );
  };
export default QuizGenerator;

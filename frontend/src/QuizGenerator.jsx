import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <Footer />
    </div>
  );
};

export default QuizGenerator;

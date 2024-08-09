import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState } from 'react';
import axios from 'axios';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [expertise, setExpertise] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [styleOfQuestions, setStyleOfQuestions] = useState('normal');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);

  const topics = ['golang', 'aws', 'javascript', 'CI/CD', 'home gardens', 'coffee', 'finger foods'];
  const expertiseLevels = ['novice', 'intermediate', 'expert'];
  const questionNumbers = [5, 10, 15];
  const questionStyles = ['master oogway', "1940's gangster", "like I'm an 8 year old", 'normal', 'jedi', 'captain jack sparrow', 'matthew mcconaughey'];

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/generate-quiz', {
        topic,
        expertise,
        questionCount,
        styleOfQuestions
      });
      setQuizQuestions(response.data.questions); 
      setQuizTitle(`Quiz on ${topic} - ${expertise}`);
      setQuizDescription(`This is a ${expertise} level quiz with ${questionCount} questions on ${topic} presented in the style of ${styleOfQuestions}.`);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };
  

  return (
    <div className="container" style={{display: 'contents'}}>
      <Header />
      <h3>Quiz Generation Options</h3>
      <div className="row">
        <div className="input-field col s12">
          <label>Topic</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="browser-default">
            <option value="" disabled>Select a topic</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="row">
        <div className="input-field col s12">
          <label>Expertise</label>
          <select value={expertise} onChange={(e) => setExpertise(e.target.value)} className="browser-default">
            <option value="" disabled>Select expertise</option>
            {expertiseLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="row">
        <div className="input-field col s12">
          <label>Number of Questions</label>
          <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} className="browser-default">
            {questionNumbers.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="row">
        <div className="input-field col s12">
          <label>Style of Questions</label>
          <select value={styleOfQuestions} onChange={(e) => setStyleOfQuestions(e.target.value)} className="browser-default">
            {questionStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button className="btn green" onClick={handleSubmit}>Generate Quiz</button>
      
      {quizTitle && (
        <div className="quiz-summary">
          <h4>{quizTitle}</h4>
          <p>{quizDescription}</p>
          <ul>
            {quizQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default QuizGenerator;

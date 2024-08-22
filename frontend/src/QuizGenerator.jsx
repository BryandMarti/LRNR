import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import QuizPageCSS from './quizPage.module.css';

const QuizGenerator = () => {
  const [topic, setTopic] = useState(''); //topics to choose
  const [expertise, setExpertise] = useState(''); //expertise levels to choose
  const [questionCount, setQuestionCount] = useState(5); // Number of questions to generate
  const [styleOfQuestions, setStyleOfQuestions] = useState('normal'); // Style of questions to generate
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const navigate = useNavigate(); // React Router hook

  //variables with the possible options for the dropdowns
  const topics = ['golang', 'aws', 'javascript', 'CI/CD', 'home gardens', 'coffee', 'finger foods'];
  const expertiseLevels = ['novice', 'intermediate', 'expert'];
  const questionNumbers = [5, 10, 15];
  const questionStyles = ['master oogway', "1940's gangster", "like I'm an 8 year old", 'normal', 'jedi', 'captain jack sparrow', 'matthew mcconaughey'];

  useEffect(() => {
    const M = window.M; 
    M.FormSelect.init(document.querySelectorAll('select'));
  }, []);
  
  const validateForm = () => {
    if (!topic || !expertise || !questionCount || !styleOfQuestions) {
      setErrorMessage('Please fill in all the fields.');
      return false;
    }
    setErrorMessage('');
    return true;
  };
  
  // This function is used to generate the quiz from the backend
  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    
    setIsLoading(true); // Start loading
    try {
      // send the data to the backend to generate the quiz
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
  

      // if the quiz was generated successfully, navigate to the quiz page
      if (data.result && data.result.quiz) {
        setIsLoading(false); // Stop loading
        navigate('/quiz-page', { state: { quiz: data.result.quiz } });
      } else {
        throw new Error('Quiz data is not in the expected format.');
      }
    } catch (error) {
      // Handle errors
      console.error('Error generating quiz:', error);
      setIsLoading(false); // Stop loading
      alert('There was an issue generating the quiz. Please try again later.');
    }
  };

  // this is used to change the dropdown options based on selected topics
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
                <option key={topic} value={topic} style={{color: 'black'}}>{topic}</option>
              ))}
            </select>
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
          </div>
        </div>

        {/* Display error message if form validation fails */}
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

        {/* Render the loading animation if isLoading is true */}
        {isLoading ? (
          <div className={QuizPageCSS.loadingContainer}>
            <div className="preloader-wrapper active">
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <p>Loading your quiz...</p>
          </div>
        ) : (
          <button className="waves-effect waves-light btn" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;

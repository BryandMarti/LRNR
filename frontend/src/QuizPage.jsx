import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuizPageCSS from './quizPage.module.css';

// this is the main component of the quiz it is responsible for rendering the quiz questions and taking the user input
const QuizPage = () => {
  const location = useLocation();
  const { quiz } = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [userAnswer, setUserAnswer] = useState(''); 
  const [score, setScore] = useState(0); // User's score, starts at 0
  const [feedback, setFeedback] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // this function is used to check the user's answer by sending it to the backend and using the backend's checkAnswer function
  const checkAnswer = async (userAnswer, correctAnswer, question) => {
    try {
      const response = await fetch('https://lrnr-quiz-backend.vercel.app/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAnswer, correctAnswer, question }),
      });
      if (!response.ok) {
        throw new Error('Failed to check answer');
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking answer:', error);
      return null;
    }
  };

  // this function is used to handle the user's answer submission
  const handleAnswerSubmit = async () => {
    if (userAnswer.trim() === '') {
      setErrorMessage('Please enter an answer.');
      return;
    }
  
    // Disable both the check answer button and the next button while checking the answer
    setIsChecking(true);
    setShowNextButton(false);
    setErrorMessage('');
  
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
  
    // Check the answer if it's true, or if it's false, show the correct answer
    const result = await checkAnswer(userAnswer, correctAnswer, currentQuestion.question);
    setIsChecking(false);
  
    // If there was no error checking the answer, show the correct/incorrect message
    if (result) {
      if (result.isCorrect) {
        setScore(score + 1);
        setFeedback(`Correct! ${result.explanation}`);
      } else {
        setFeedback(`Incorrect. ${result.explanation}`);
      }
    } else {
      // If there was an error checking the answer, show an error message
      setFeedback('Error checking answer. Please try again.');
    }
  
    // Show the next button after the answer has been checked
    setShowNextButton(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setFeedback('');
      setShowNextButton(false); // Hide the next button until the user submits the next answer
    } else {
      setFeedback(`Quiz Completed! Your final score is ${score} / ${quiz.questions.length}`);
      setQuizCompleted(true); 
    }
  };
  


  // unused handleretry, this would count the number of correct answer against the number of answers and give the total to the user.
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setScore(0);
    setFeedback('');
    setShowNextButton(false);
    setQuizCompleted(false); 
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className={QuizPageCSS.quizContainer}>
      {!quizCompleted && (
        <div className={QuizPageCSS.questionNumberContainer}>
          <h2 style={{ color: '#009688' }}>{`${currentQuestionIndex + 1} of ${quiz.questions.length}`}</h2>
        </div>
      )}
      
      {!quizCompleted && <h4 style={{ fontFamily: 'sans-serif', fontSize: '54px', color: '#009688' }}>Question</h4>}
      
      {!quizCompleted ? (
        <>
          <div className={QuizPageCSS.questionSection}>
            <p style={{marginBottom: '5rem'}}>{currentQuestion.question}</p>
            
            <h3 style={{ fontFamily: 'sans-serif', color: '#009688', fontSize: '44px', marginBottom: '10px' }}>Your Answer</h3>
            
            <label style={{ color: '#009688', fontSize: '16px' }}>Answer</label>
            <input
              style={{ color: 'black', marginBottom: '10px' }}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here"
              disabled={showNextButton || isChecking}
            />

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <button 
              className="waves-effect waves-light btn"
              onClick={handleAnswerSubmit} 
              disabled={showNextButton || isChecking || userAnswer.trim() === ''}
              style={{ marginTop: '10px', backgroundColor: '#4CAF50' }}
            >
              {isChecking ? 'Checking...' : 'Submit Answer'}
            </button>
            
            <div className={QuizPageCSS.evaluationSection}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <h4 style={{fontFamily: 'sans-serif', color: '#009688' }}>Verner's Evaluation</h4>
              </div>
              <div style={{ display: 'flex', position:'relative', justifyContent: 'right' }}>
                <p style={{maxWidth: '50%', position: 'static', right: '0'}}>{feedback}</p>
              </div>
            </div>

            {showNextButton && (
              <button className="waves-effect waves-light btn" onClick={handleNextQuestion} style={{ backgroundColor: '#4CAF50' }}>
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <div className={QuizPageCSS.resultContainer} style={{margin: '6rem 0 18rem 0'}}>
          <h5 style={{fontFamily: 'Roboto, sans-serif', color: '#009688', fontSize: '65px' }}>lrnr</h5>
          <p style={{fontWeight: 'bold', padding: '2rem'}}>Questions Right: 0111</p>
          <button className="waves-effect waves-light btn" style={{ backgroundColor: '#4CAF50' }}>
            Try Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuizPageCSS from './quizPage.module.css'
const QuizPage = () => {
  const location = useLocation();
  const { quiz } = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

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

  const handleAnswerSubmit = async () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    setIsChecking(true);
    setShowNextButton(true);

    const result = await checkAnswer(userAnswer, correctAnswer, currentQuestion.question);
    setIsChecking(false);

    if (result) {
      if (result.isCorrect) {
        setScore(score + 1);
        setFeedback(`Correct! ${result.explanation}`);
      } else {
        setFeedback(`Incorrect. ${result.explanation}`);
      }
    } else {
      setFeedback('Error checking answer. Please try again.');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setFeedback('');
      setShowNextButton(false);
    } else {
      setFeedback(`Quiz Completed! Your final score is ${score} / ${quiz.questions.length}`);
      setQuizCompleted(true); 
    }
  };

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
       <div className={QuizPageCSS.questionNumberContainer}> <h2   style={{color: '#009688'}}>{` ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</h2></div>
      <h4 style={{color: '#009688'}}>Question</h4>
      {/* <p>{quiz.description}</p> */}
      {!quizCompleted ? (
        <>
          <div className="question-section">
         
            <p>{currentQuestion.question}</p>
            <h3 style={{color: '#009688', fontSize: '30px'}}>Your Answer</h3>
            <p style={{color: '#009688'}}>Answer</p>
            <input
              style={{color: 'black'}}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here"
              disabled={showNextButton || isChecking}
            />
          </div>
          <button 
           className="waves-effect waves-light btn"
            onClick={handleAnswerSubmit} 
            disabled={showNextButton || isChecking || userAnswer.trim() === ''}
          >
            {isChecking ? 'Checking...' : 'Submit Answer'}
          </button>

      
          <p>{feedback}</p>
          {showNextButton && (
            <button  className="waves-effect waves-light btn" onClick={handleNextQuestion}>
              Next 
            </button>
          )}
        </>
      ) : (
        <div className={QuizPageCSS.resultContainer}>
          <h5 style={{color: '#009688', fontSize: '55px'}}>lrnr</h5>
          <p>Questions Right: {score} / {quiz.questions.length}</p>
          <button className="waves-effect waves-light btn" onClick={handleRetry}>
            Try Another Quiz
          </button>
        </div>
      )}
      
    </div>
  );
};

export default QuizPage;
import React, { useState } from 'react';

const QuizPage = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerSubmit = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer('');
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container">
      <h4>{quiz.title}</h4>
      <p>{quiz.description}</p>
      <div className="question-section">
        <h5>{`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</h5>
        <p>{currentQuestion.text}</p>
        {currentQuestion.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <button className="btn green" onClick={handleAnswerSubmit}>
        Submit Answer
      </button>
    </div>
  );
};

export default QuizPage;

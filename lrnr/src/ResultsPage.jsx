import React from 'react';

const ResultsPage = ({ result }) => {
  return (
    <div className="container">
      <h4>Quiz Results</h4>
      <div className="result-summary">
        <p>{`You scored ${result.score} out of ${result.totalQuestions}`}</p>
        <p>{result.feedback}</p>
      </div>
      <button className="btn green" onClick={result.retryQuiz}>
        Retry Quiz
      </button>
    </div>
  );
};

export default ResultsPage;

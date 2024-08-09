import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import AccountPage from './AccountPage.jsx';
import QuizGenerator from './QuizGenerator.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/quiz-generator" element={<QuizGenerator />} />
        
      </Routes>
    </Router>
  );
}

export default App;

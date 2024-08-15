import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import AccountPage from './AccountPage.jsx';
import QuizGenerator from './QuizGenerator.jsx';
import QuizPage from './QuizPage.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/quiz-generator" element={<QuizGenerator />} />
        <Route path="/quiz-page" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;

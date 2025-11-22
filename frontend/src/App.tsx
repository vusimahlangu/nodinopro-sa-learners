import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuizPlayer from './pages/QuizPlayer';

export default function App() {
  return (
    <div className="app">
      <nav style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      </nav>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quizzes/:id" element={<QuizPlayer />} />
        </Routes>
      </main>
    </div>
  );
}
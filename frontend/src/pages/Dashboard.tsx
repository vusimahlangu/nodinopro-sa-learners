import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Array<any>>([]);

  useEffect(() => { fetchQuizzes(); }, []);
  async function fetchQuizzes() {
    const res = await api.get('/quizzes');
    setQuizzes(res.data);
  }

  return (
    <div>
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map((q: any) => (
          <li key={q.id}><Link to={`/quizzes/${q.id}`}>{q.title}</Link> - {q.description}</li>
        ))}
      </ul>
    </div>
  );
}
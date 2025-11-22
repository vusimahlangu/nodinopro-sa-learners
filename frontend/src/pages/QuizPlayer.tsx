import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import QuizQuestion from '../components/QuizQuestion';

export default function QuizPlayer() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<any>(null);

  useEffect(() => { if (id) fetchQuiz(Number(id)); }, [id]);

  async function fetchQuiz(quizId: number) {
    const res = await api.get(`/quizzes/${quizId}`);
    setQuiz(res.data);
  }

  function setAnswer(questionId: number, optionId: number) {
    setAnswers(a => ({ ...a, [questionId]: optionId }));
  }

  async function submit() {
    if (!quiz) return;
    const payload = { answers: Object.entries(answers).map(([q, o]) => ({ questionId: Number(q), optionId: Number(o) })) };
    try {
      const res = await api.post(`/quizzes/${quiz.id}/submit`, payload);
      setResult(res.data);
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Submit failed. Are you logged in?');
    }
  }

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      {quiz.questions.map((q: any) => (
        <QuizQuestion key={q.id} question={q} value={answers[q.id]} onChange={(optId: number) => setAnswer(q.id, optId)} />
      ))}
      <button onClick={submit}>Submit</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <p>Score: {result.score}% ({result.correct}/{result.total})</p>
        </div>
      )}
    </div>
  );
}
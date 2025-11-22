import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isSignup) {
        const res = await api.post('/auth/signup', { email, password, name });
        localStorage.setItem('token', res.data.token);
      } else {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
      }
      navigate('/');
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>{isSignup ? 'Sign up' : 'Log in'}</h2>
      <form onSubmit={submit}>
        {isSignup && (
          <div><label>Name</label><input value={name} onChange={e => setName(e.target.value)} /></div>
        )}
        <div><label>Email</label><input value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
        <button type="submit">{isSignup ? 'Sign up' : 'Log in'}</button>
      </form>
      <button onClick={() => setIsSignup(s => !s)} style={{ marginTop: 10 }}>
        {isSignup ? 'Have an account? Log in' : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
import React from 'react';

export default function QuizQuestion({ question, value, onChange }: any) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p><strong>{question.text}</strong></p>
      <div>
        {question.options.map((opt: any) => (
          <div key={opt.id}>
            <label>
              <input type="radio" name={`q_${question.id}`} checked={value === opt.id} onChange={() => onChange(opt.id)} /> {opt.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
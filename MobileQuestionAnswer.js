import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const MobileQuestionAnswer = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Hardcoded questions
  const questions = [
    {
      question: 'What is the capital of France?',
      options: { A: 'Paris', B: 'London', C: 'Berlin', D: 'Madrid' },
      answer: 'A',
    },
    {
      question: 'What is the largest ocean?',
      options: { A: 'Indian Ocean', B: 'Atlantic Ocean', C: 'Arctic Ocean', D: 'Pacific Ocean' },
      answer: 'D',
    },
  ];

  useEffect(() => {
    setQuestion(questions[questionId]);
  }, [questionId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('answer', { name: playerName, answer: selectedAnswer, correctAnswer: question.answer });
  };

  useEffect(() => {
    // Listen for feedback from the main screen
    socket.on('wrongAnswer', () => {
      alert('Wrong answer. Try again!');
    });
  }, []);

  return (
    <div>
      <h2>{question.question}</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(question.options).map(([key, value]) => (
          <label key={key}>
            <input
              type="radio"
              value={key}
              checked={selectedAnswer === key}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            {value}
          </label>
        ))}
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default MobileQuestionAnswer;

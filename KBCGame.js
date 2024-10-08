import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const KBCGame = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: {},
    answer: '',
  });
  const [playerName, setPlayerName] = useState('');
  const [congratulationsMessage, setCongratulationsMessage] = useState('');

  // Hardcoded questions for demonstration
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
    if (questions.length > 0) {
      setCurrentQuestion(questions[questionIndex]);
    }
  }, [questionIndex]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setCongratulationsMessage(`Congratulations ${playerName}!`);
      setTimeout(() => {
        setCongratulationsMessage('');
        if (questionIndex < questions.length - 1) {
          setQuestionIndex(questionIndex + 1);
        } else {
          alert('Game Over! Thank you for playing!');
        }
      }, 2000);
    } else {
      alert('Wrong answer!');
    }
  };

  return (
    <div>
      <h1>KBC Game</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.options && Object.entries(currentQuestion.options).map(([key, value]) => (
          <li key={key}>
            <button onClick={() => handleAnswer(key)}>{`${key}: ${value}`}</button>
          </li>
        ))}
      </ul>
      <QRCodeCanvas value={`http://localhost:3000/question/${questionIndex}`} />
      {congratulationsMessage && <p>{congratulationsMessage}</p>}
    </div>
  );
};

export default KBCGame;

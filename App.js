import React from 'react';
import { Route, Routes } from 'react-router-dom';
import KBCGame from './components/KBCGame'; 
import QRCodeDisplay from './components/QRCodeDisplay'; 
import MobileQuestionAnswer from './components/MobileQuestionAnswer'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<KBCGame />} />
      <Route path="/question/:questionId" element={<MobileQuestionAnswer />} />
      <Route path="/question/:questionId" element={<QRCodeDisplay />} />
    </Routes>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeDisplay from './pages/HomeDisplay';
function App() {
  return (
    <Routes>
          <Route 
          path="/"
          element={ <HomeDisplay /> } />
    </Routes>
  );
}

export default App;

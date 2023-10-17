import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeDisplay from './pages/HomeDisplay';
import ProfileDisplay from './pages/ProfileDisplay';
import TransactionsDisplay from './pages/TransactionsDisplay';
import ReportDisplay from './pages/ReportDisplay';
function App() {
  return (
    <Routes>
          <Route 
          path="/"
          element={ <HomeDisplay /> } />
          <Route 
          path="/transactions"
          element={ <TransactionsDisplay /> } />
          <Route 
          path="/profile"
          element={ <ProfileDisplay /> } />
          <Route 
          path="/reports"
          element={ <ReportDisplay /> } />
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeDisplay from './pages/HomeDisplay';
import ProfileDisplay from './pages/ProfileDisplay';
import TransactionsDisplay from './pages/TransactionsDisplay';
import LoginDisplay from './pages/LoginDisplay';
import SignupDisplay from './pages/SignupDisplay';
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
          <Route 
          path="/signup"
          element={ <LoginDisplay /> } />
          <Route 
          path="/login"
          element={ <SignupDisplay /> } />
    </Routes>
  );
}

export default App;

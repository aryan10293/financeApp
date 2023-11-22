import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeDisplay from './pages/HomeDisplay';
import ProfileDisplay from './pages/ProfileDisplay';
import TransactionsDisplay from './pages/TransactionsDisplay';
import LoginDisplay from './pages/LoginDisplay';
import SignupDisplay from './pages/SignupDisplay';
import ReportDisplay from './pages/ReportDisplay';
function App() {
  const [userData,setUserData] = React.useState<any[]>([])
  React.useEffect(() => {
    const fetchData = async() => {
      try {
        const reg = await fetch(`http://localhost:2014/getuser/${localStorage.getItem('token')}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await reg.json()
    //    console.log(data)
        if(data.success){
          setUserData(data.userinfo)
        }
        } catch(err) {
            console.error(err)
        }
    }
    fetchData()
  }, [])
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

import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
import { Configuration, PlaidEnvironments } from 'plaid';
function Home() {
  const [linkToken, setLinkToken] = React.useState<any>('');
  const [userData, setUserData] = React.useState<any[]>([])

  const testing = async (e:any) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:2014/getplaidtoken/${localStorage.getItem('token')}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`}
      })
      const info = await response.json()
      console.log(info)
    //   if (window.Plaid) {
    //   const handler = window.Plaid.create({
    //     token: info.link_token,
    //     onSuccess: handleSuccess,
    //     onExit: handleExit,
    //     // Add other options as needed
    //   });

    //   // Open Plaid Link
    //   handler.open();
    // }

    //   // Open Plaid Link
    //   handler.open();
    // }
    // } catch (error) {
    //   console.error(error)
    // }
  }
  return (
    <>
    <Nav page='home'/>


    <h1 className="bg-money-green text-white">
      This is a money green background.
    </h1>
    <button onClick={testing}>click me for a test</button>
    </>
  )
}

export default Home

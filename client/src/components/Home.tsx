import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
import {usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess} from 'react-plaid-link';
function Home() {
  const [linkToken, setLinkToken] = React.useState<any>('');
  const [userData, setUserData] = React.useState<any[]>([])
  const handleSuccess = (publicToken: string, metadata: any) => {
    // Handle the obtained public token
    console.log('Public Token:', publicToken);
  };
   const handleExit = (error: any, metadata: any) => {
    // Handle the exit event
    if (error) {
      console.error('Plaid Link exit with error:', error);
    }
  };
    const testing = async (e:any) => {
      e.preventDefault()
      try {
        const response = await fetch(`http://localhost:2014/getplaidtoken/${localStorage.getItem('token')}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`}
        })
        const info = await response.json()
        const config: PlaidLinkOptions = {
            onSuccess: handleSuccess,
            onExit: handleExit,
            onEvent: (eventName, metadata) => {},
            token: info.link_token,
          };
          const { open, exit, ready } = usePlaidLink(config);
      } catch(err) {
        console.log(err)
      }
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

/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
import {usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess} from 'react-plaid-link';
function Home() {
  const [linkToken, setLinkToken] = React.useState<any>('');
  const [count, setCount] = React.useState<number>(0)
  // Fetch link token from your server
  const fetchLinkToken = async () => {
    try {
      const response = await fetch(`http://localhost:2014/getplaidtoken/${localStorage.getItem('token')}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
          });
      if (response.ok) {
        const data = await response.json();
        console.log(data.link_token)
          if(count === 0){
            setLinkToken(data.link_token);
            setCount(3)
          }
      } else {
        console.error('Error fetching link token');
      }
    } catch (error) {
      console.error('Error fetching link token:', error);
    }
  };

  // Trigger Plaid Link when link token is available
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log('success', public_token, metadata);
      // send public_token to server
    },
  });

   React.useEffect( () => {
        const lol = () => { fetchLinkToken();}
        lol()
    }, []);
  return (
    <>
    <Nav page='home'/>


    <h1 className="bg-money-green text-white">
      This is a money green background.
    </h1>
    {linkToken ? <button onClick={() =>  open()} disabled={!ready}>Connect to bank</button> : (
      null
    )}
    {/* {publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>} */}
    </>
  )
}

export default Home


/// turn the linktoken stuff into a use effect and lets see what that does tomorrow 
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
import {usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess} from 'react-plaid-link';
function Home() {
  const [linkToken, setLinkToken] = React.useState<any>('');
  const [userData, setUserData] = React.useState<any[]>([])
  const [publicToken, setPublicToken] = React.useState<any>('')

  React.useEffect(() => {
    const fetchData = async () => {
      // let accessToken = await axios.post("/exchange_public_token", {public_token: publicToken});
      let acessToken = await fetch(`http://localhost:2014/exchangetoken`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        body: JSON.stringify({public: publicToken})
      })

      let exchange = await  acessToken.json()
      console.log(exchange.accessToken)

      let authToken = await fetch(`http://localhost:2014/auth`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        body: JSON.stringify({access: exchange.accessToken})
      })

      let auth = await authToken.json()
      console.log(auth)

      // console.log("accessToken", accessToken.data);
      // const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken});
      // console.log("auth data ", auth.data);
      //setAccount(auth.data.numbers.ach[0]);
      // const { open, ready } = usePlaidLink({
      //   token: linkToken,
      //   onSuccess: (publicToken, metadata) => {
      //     setPublicToken(publicToken);
      //     console.log("success", publicToken, metadata);
      //     // send public_token to server
      //   },
      // });
    }
    // fetchData()
  }, [publicToken, linkToken])
  const handleSuccess = async (publicToken: string, metadata: any) => {
    // Handle the obtained public token
    console.log('Public Token:', publicToken);
      try {
    // Send the public token to your server for exchange
    const response = await fetch('http://localhost:2014/exchangetoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ publicToken }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      // console.log('Access Token:', data.access_token);
      // console.log('Item ID:', data.item_id);
    } else {
      console.error('Failed to exchange public token:', response.statusText);
    }
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }

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
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`}
        })
        const info = await response.json()
        setPublicToken(info.link_token)
        console.log(info)
        // const config: PlaidLinkOptions = {
        //     onSuccess: handleSuccess,
        //     onExit: handleExit,
        //     onEvent: (eventName, metadata) => {},
        //     token: info.link_token,
        //   };
          // const { open, ready } = usePlaidLink({
          //   token: linkToken,
          //   onSuccess: (public_token, metadata) => {
          //     //setPublicToken(public_token);
          //     console.log("success", public_token, metadata);
          //     // send public_token to server
          //   },
          // });


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
    {/* publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button> */}
    </>
  )
}

export default Home


/// turn the linktoken stuff into a use effect and lets see what that does tomorrow 
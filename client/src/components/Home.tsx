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
      console.log(exchange)
      // console.log("accessToken", accessToken.data);
      // const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken});
      // console.log("auth data ", auth.data);
      //setAccount(auth.data.numbers.ach[0]);
    }
    fetchData()
  }, [publicToken])
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
    </>
  )
}

export default Home

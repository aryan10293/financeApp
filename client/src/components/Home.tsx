import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
const Home = () => {
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const response = await fetch(`http://localhost:2014/getplaidtoken/${localStorage.getItem('token')}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
    });
    const data = await response.json();
    console.log(data.link_token)
    setLinkToken(data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback((public_token:any, metadata:any) => {
    // send public_token to server
    const response = fetch(`http://localhost:2014/exchangetoken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
    // Handle response ...
  }, []);
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};
export default Home;

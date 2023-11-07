const plaid = require('plaid');
const Trans = require("../model/Transaction");
const User = require("../model/User");
const plaidClient = new plaid.Client({
  clientID: process.env.CLIENT_ID,
  secret: process.env.SANDBOX,
  env: plaid.environments.sandbox, 
});

module.exports = {
    createPlaidToken:  (req,res) => {
         plaidClient.env.createPublicToken({
            user: {
            client_user_id: 'unique-user-id', // Generate a unique user ID for each user
            },
            client_name: 'Your App Name',
            products: ['auth', 'transactions'], // Specify the desired products (e.g., 'auth', 'transactions')
            country_codes: ['US'], // Specify the country codes
            language: 'en', // Specify the language
        }, (err, response) => {
            if (err) {
            console.error(err);
            return res.status(500).send('Im fucked if i dont get more consistent');
            }
            const linkToken = response.link_token;
            res.json({ link_token: linkToken });
            })
    }
}
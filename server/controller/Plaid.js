const plaid = require('plaid');
const { environments } = plaid;
const Trans = require("../model/Transaction");
const User = require("../model/User");
const jwt = require('jsonwebtoken');
const plaidClient = new plaid.Client({
  clientID: process.env.CLIENT_ID,
  secret: process.env.SANDBOX,
  env: plaid.environments.sandbox,
  options: {
    version: '2022-01-01' // specify the desired API version
  }
});

console.log(plaidClient)

 function getUserId(token){
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
          if (err) {
            // Token is invalid or expired
            // Handle unauthorized access
            return 'Invalid or expired token. Please log in again.'
            // res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
          } else {
            const userId = decoded.sub;
            console.log(1, token)
            // Fetch user account data from the database based on userId
            console.log(2, userId)

            return 'this is cool'
          }
      })
 }
module.exports = {
    createPlaidToken: async  (req,res) => {
      let clientID; 
      jwt.verify(req.params.token, process.env.SECRET_KEY, async (err, decoded) => {
          if (err) {
            // Token is invalid or expired
            // Handle unauthorized access
            return 'Invalid or expired token. Please log in again.'
            // res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
          } else {
            const userId = decoded.sub;
            // Fetch user account data from the database based on userId
            clientID =  userId

            return 'this is cool'
          }
      })

      
         plaidClient.createPublicToken({
            user: {
            client_user_id: clientID, // Generate a unique user ID for each user
            },
            client_name: 'Drej finance app',
            products: ['auth', 'transactions'], // Specify the desired products (e.g., 'auth', 'transactions')
            country_codes: ['US'], // Specify the country codes
            language: 'en', // Specify the language
        }, (err, response) => {
            if (err) {
            console.error(err);
            return res.status(500).send(err);
            }
            const linkToken = response.link_token;
            res.json({ link_token: linkToken });
            })
    }
}

// jwt.verify(req.params.token, process.env.SECRET_KEY, async (err, decoded) => {
//           if (err) {
//             // Token is invalid or expired
//             // Handle unauthorized access
//             res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
//           } else {
//             const userId = decoded.sub;
//             // Fetch user account data from the database based on userId
//             let thisIsAwe = await User.find({_id: userId}) // user info if token is not expired
//             res.status(200).json({success: true, message:'this shit working brother enjoy yourself youre loggen in', userinfo: thisIsAwe})
//           }
//   })


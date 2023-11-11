import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import Transaction from '../model/Transaction.js';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: './config/.env' });
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.CLIENT_ID,
      'PLAID-SECRET': process.env.SANDBOX,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const plaidClient = new PlaidApi(configuration);
console.log(plaidClient.configuration)
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
const plaidThing = {
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

      
        // plaidClient.sandboxPublicTokenCreate({
        //     user: {
        //     client_user_id: clientID, // Generate a unique user ID for each user
        //     },
        //     client_name: 'Drej finance app',
        //     products: ['auth', 'transactions'], // Specify the desired products (e.g., 'auth', 'transactions')
        //     country_codes: ['US'], // Specify the country codes
        //     language: 'en', // Specify the language
        // }, (err, response) => {
        //     if (err) {
        //     console.error(err);
        //     return res.status(500).send(err);
        //     }
        //     const linkToken = response.link_token;
        //     res.json({ link_token: linkToken });
        //     })
        const request = {
          institution_id: 'ins_109508',
          initial_products: ['auth', 'transactions'],
        };    

        const response = await plaidClient.sandboxPublicTokenCreate(request);
        let linkToken =  response.data.public_token
        res.json({ link_token: linkToken });
    }
}
export default plaidThing
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


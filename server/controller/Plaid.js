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
        const request = {
          institution_id: 'ins_109508',
          initial_products: ['auth', 'transactions'],
        };    

        const response = await plaidClient.sandboxPublicTokenCreate(request);
        let linkToken =  response.data.public_token
        res.json({ link_token: linkToken });
    },
    exchangeToken: async(req,res) => {
      const publicToken = req.body.public;
      try {
          const plaidResponse = await plaidClient.itemPublicTokenExchange({
              public_token: publicToken,
          });
          // These values should be saved to a persistent database and
          // associated with the currently signed-in user
          const accessToken = plaidResponse.data.access_token;
          res.json({ accessToken });
      } catch (error) {
          res.status(500).send("failed");
      }
    },
    auth: async(req,res) => {
      try {
       const access_token = req.body.access;
       const plaidRequest = {
           access_token: access_token,
       };
       const plaidResponse = await plaidClient.authGet(plaidRequest);
       res.json(plaidResponse.data);
      } catch (e) {
          res.status(500).send("failed");
      }

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


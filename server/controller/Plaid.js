const plaid = require('plaid')
const Trans = require("../model/Transaction");
const User = require("../model/User");
const plaidClient = new plaid.Client({
  clientID: process.env.CLIENT_ID,
  secret: process.env.SANDBOX,
  env: plaid.environments.sandbox, 
});
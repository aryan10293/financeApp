import express from "express";
const router = express.Router();
import auth from "../controller/auth.js"
import trans from "../controller/Trans.js"
import plaidThing from "../controller/Plaid.js"
import authenticateToken from "../middleware/jwt.js";


// random routes and shit go here 
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
router.use(authenticateToken);
router.get('/getuser/:token',  auth.checkUser)
router.post('/getplaidtoken/:token', plaidThing.createPlaidToken)
router.get('/gettransactions/:id/:time', trans.getTransacations)
router.post('/posttransaction',  trans.postTransactions)
export default router;
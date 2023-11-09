import express from "express";
const router = express.Router();
const authController = require("../controller/auth")
const transController = require("../controller/Trans")
const plaidController = require("../controller/Plaid")
const token = require("../middleware/jwt")

// random routes and shit go here 
router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.use(token);
router.get('/getuser/:token',  authController.checkUser)
router.post('/getplaidtoken/:token', plaidController.createPlaidToken)
router.get('/gettransactions/:id/:time', transController.getTransacations)
router.post('/posttransaction',  transController.postTransactions)
export default router;
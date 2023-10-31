const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")
const transController = require("../controller/Trans")
const token = require("../middleware/jwt")

// random routes and shit go here 
router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.use(token);
router.get('/getuser/:token',  authController.checkUser)
router.post('/posttransaction',  transController.postTransactions)
router.get('/gettransactions/:id/:time', transController.getTransacations)
module.exports = router;
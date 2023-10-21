const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")
const token = require("../middleware/jwt")

// random routes and shit go here 
router.post('/createaccount', authController.postCreateAccount)
router.use(token);
router.get('/getuser',  authController.checkUser)
module.exports = router;
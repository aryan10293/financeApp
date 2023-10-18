const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")

// random routes and shit go here 
router.post('/createaccount', authController.postCreateAccount)

module.exports = router;
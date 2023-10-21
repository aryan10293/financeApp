const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./config/.env" });
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  console.log(token)
  if (!token) return res.status(401).send('Access denied.');
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user; // Now req.user contains the decoded user information
    next();
  });
}

module.exports = authenticateToken;
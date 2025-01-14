const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to verify the JWT token
function verifyToken(req, res, next) {
  //const token = req.headers['authorization'];
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  // Use the same secret key that Strapi uses to sign the tokens
  const secretKey = process.env.JWT_SECRET;

  console.log('Middleware Verifying Token...');
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    next();
  });
}

module.exports = verifyToken;

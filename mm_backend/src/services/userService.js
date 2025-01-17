const jwt = require('jsonwebtoken');

// Hardcoded credentials
const hardcodedUser = 'admin';  // Replace with your actual hardcoded user
const hardcodedPassword = 'admin';  // Replace with your actual hardcoded password
const secretKey = process.env.JWT_SECRET;  // JWT secret for generating tokens

// login
exports.login = async function (user, password) {
  try {
    // Compare the provided user and password with hardcoded values
    if (user === hardcodedUser && password === hardcodedPassword) {
      // If credentials are valid, create a JWT token
      const token = jwt.sign(
        { username: user },
        secretKey,
        { expiresIn: '1h' }  // Token expiration (1 hour in this example)
      );

      // Return the token and user data (mocked)
      return {
        user: { username: user },
        jwt: token
      };
    } else {
      // If credentials are incorrect, throw an error
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error: ', error);
    throw new Error('Error logging in');
  }
};

// verify
exports.verifyToken = async function (token) {
  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        throw new Error('Invalid Token');
      }
      // If token is valid, return the decoded payload
      return decoded;
    });
  } catch (error) {
    console.error('Token verification error: ', error);
    throw new Error('Token verification failed');
  }
};

// update user info by id
// This function is still decoupled from Strapi, so you can modify it for local use if necessary
exports.updateUserInfoById = async function (id, body) {
  // Assuming local user data or mock storage, you would handle updates here
  console.log(`Updating user ${id} with data:`, body);
  return { success: true };  // Mock response
};

// get all users
// You can replace this function to return a list of hardcoded users or local data
exports.getAllUsers = async function () {
  const mockUsers = [
    { id: 1, username: 'admin' },
    { id: 2, username: 'admin2' }
  ];

  return mockUsers;  // Return mock users as an example
};


// const axios = require('axios');
// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// // strapi constants
// const strapiHost = process.env.STRAPI_HOST;
// const strapiPort = process.env.STRAPI_PORT;
// const strapiAuthToken = process.env.STRAPI_AUTH_TOKEN;
// const secretKey = process.env.JWT_SECRET;

// // Construct the Strapi URL
// const strapiUrl = `http://${strapiHost}:${strapiPort}/api`;

// // login
// exports.login = async function (user, password) {
//   return (await axios.post(`${strapiUrl}/auth/local`, {
//     identifier: user,
//     password: password
//   })).data;
// }

// // verify
// exports.verifyToken = async function (token) {
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       throw Error('Invalid Token');
//     }
//     // If token is valid return
//     return;
//   });
// }

// // update user info by id
// exports.updateUserInfoById = async function (id, body) {
//   await axios.put(`${strapiUrl}/users/${id}`, body, {
//     headers: {
//       'Authorization': `Bearer ${strapiAuthToken}`
//     }
//   });
// }

// // get all users
// exports.getAllUsers = async function () {
//   return (await axios.get(`${strapiUrl}/users?sort=username:ASC&pagination[withCount]=false`, {
//     headers: {
//       'Authorization': `Bearer ${strapiAuthToken}`
//     }
//   })).data;
// }

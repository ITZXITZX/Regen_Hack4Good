const axios = require('axios');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// strapi constants
const strapiHost = process.env.STRAPI_HOST;
const strapiPort = process.env.STRAPI_PORT;
const strapiAuthToken = process.env.STRAPI_AUTH_TOKEN;
const secretKey = process.env.JWT_SECRET;

// Construct the Strapi URL
const strapiUrl = `http://${strapiHost}:${strapiPort}/api`;

// login
exports.login = async function (user, password) {
  return (await axios.post(`${strapiUrl}/auth/local`, {
    identifier: user,
    password: password
  })).data;
}

// verify
exports.verifyToken = async function (token) {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      throw Error('Invalid Token');
    }
    // If token is valid return
    return;
  });
}

// update user info by id
exports.updateUserInfoById = async function (id, body) {
  await axios.put(`${strapiUrl}/users/${id}`, body, {
    headers: {
      'Authorization': `Bearer ${strapiAuthToken}`
    }
  });
}

// get all users
exports.getAllUsers = async function () {
  return (await axios.get(`${strapiUrl}/users?sort=username:ASC&pagination[withCount]=false`, {
    headers: {
      'Authorization': `Bearer ${strapiAuthToken}`
    }
  })).data;
}

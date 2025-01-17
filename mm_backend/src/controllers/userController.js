const userService = require('../services/userService.js');

exports.login = async (req, res) => {
  try {
    // Extract the user and password from the request body
    const { user, password } = req.body;

    console.log('Logging in...');

    // Hardcoded credentials for comparison
    const hardcodedUser = 'admin';  // Replace with your actual hardcoded user
    const hardcodedPassword = 'admin';  // Replace with your actual hardcoded password

    // Check if the provided user and password match the hardcoded values
    if (user === hardcodedUser && password === hardcodedPassword) {
      // If credentials are valid, create a mock userData object
      const userData = {
        user: { username: user },
        jwt: 'mock-jwt-token',  // You would typically generate a real JWT token here
      };

      // Set JWT as a cookie
      res.cookie('token', userData.jwt, {
        httpOnly: true,
        secure: false,  // Change this based on your environment (true for production)
        maxAge: 3600000,  // 1 hour
        sameSite: 'Lax',
      });

      // Send back the user data
      res.status(200).json({ user: userData.user });
    } else {
      // If credentials are incorrect, return an error
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

exports.residentLogin = async (req, res) => {
  try {
    // Extract the user and password from the request body
    const { user, password } = req.body;

    console.log('Logging in...');

    // Hardcoded credentials for comparison
    const hardcodedUser = 'resident';  // Replace with your actual hardcoded user
    const hardcodedPassword = 'resident';  // Replace with your actual hardcoded password

    // Check if the provided user and password match the hardcoded values
    if (user === hardcodedUser && password === hardcodedPassword) {
      // If credentials are valid, create a mock userData object
      const userData = {
        user: { username: user },
        jwt: 'mock-jwt-token',  // You would typically generate a real JWT token here
      };

      // Set JWT as a cookie
      res.cookie('token', userData.jwt, {
        httpOnly: true,
        secure: false,  // Change this based on your environment (true for production)
        maxAge: 3600000,  // 1 hour
        sameSite: 'Lax',
      });

      // Send back the user data
      res.status(200).json({ user: userData.user });
    } else {
      // If credentials are incorrect, return an error
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    // Extract the user and password from the request body
    const { user, password } = req.body;

    console.log('Logging in...');

    const hardcodedUser = 'admin';  // Hardcoded user
    const hardcodedPassword = 'admin';  // Hardcoded password

    // Check if the provided user and password match the hardcoded values
    if (user === hardcodedUser && password === hardcodedPassword) {
      // If credentials are valid, create a mock userData object
      const userData = {
        user: { username: user },
        jwt: 'mock-jwt-token',  // Hardcoded token
      };

      // Set JWT as a cookie
      res.cookie('token', userData.jwt, {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000,  // 1 hour
        sameSite: 'Lax',
      });

      // Send back the user data
      res.status(200).json({ user: userData.user });
    } else {
      // If credentials are incorrect, return an error
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// exports.login = async (req, res) => {
//   try {
//     // make sure page size and page are valid numbers
//     const user = req.body.user;
//     const password = req.body.password;

//     console.log('Logging in...');

//     // get userData
//     const userData = await userService.login(user, password);

//     // Set JWT as a cookie
//     res.cookie('token', userData.jwt, {
//       httpOnly: true,
//       secure: false, //process.env.NODE_ENV === 'development', // Send the cookie over HTTPS only in production
//       maxAge: 3600000, // 1 hour
//       sameSite: 'Lax',
//     });

//     // send only user data
//     res.status(200).json({ user: userData.user });
//   } catch (error) {
//     console.error('Error logging in: ', error);
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };

exports.signout = async (req, res) => {
  try {
    console.log('Signing out...');

    // remove jwt
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
      sameSite: 'Lax',
    });

    res.status(200).send({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Error signing out: ', error);
    res.status(500).json({ message: 'Error signing out' });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const token = req.cookies.token;

    console.log('Verifying Token...');
    await userService.verifyToken(token);
    res.status(200).json({ message: 'Valid Token' });
  } catch (error) {
    console.error('Error verifying token: ', error);
    res.status(500).json({ message: 'Invalid Token' });
  }
};

exports.updateUserInfoById = async (req, res) => {
  try {
    // verifiy data TODO
    const id = req.query.userId;
    const body = {
      username: req.body.username,
      phone_number: req.body.phone_number,
    };

    console.log('Updating user info by ID...')
    await userService.updateUserInfoById(id, body);
    res.status(200).json({ message: 'User Info Updated' });
  } catch (error) {
    console.error('Error updating user info: ', error);
    res.status(500).json({ message: 'Error updating user info' });
  }
};

exports.changeUserPassword = async (req, res) => {
  try {
    // verfiy new pwd
    await userService.login(req.body.user, req.body.oldPassword);

    // verifiy data TODO
    const id = req.query.userId;
    const body = {
      password: req.body.newPassword,
    };

    console.log('Changing user password...')
    await userService.updateUserInfoById(id, body);
    res.status(200).json({ message: 'User Info Updated' });
  } catch (error) {
    //console.error('Error changing user password: ', error);
    res.status(500).json({ message: 'Error changing user password' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log('Getting all users...')
    const users = await userService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users: ', error);
    res.status(500).json({ message: 'Error getting all users' });
  }
};
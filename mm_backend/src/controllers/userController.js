const { NextApiRequest, NextApiResponse } = require('next');


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

// Controller to handle creating a user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extract data from request body

    const newUser = await userService.createUser(username, email, password); // Call service to create user

    if (newUser) {
      res.status(201).json({ message: 'User created successfully', user: newUser }); // Send success response
    } else {
      res.status(400).json({ message: 'Failed to create user' }); // Send error response
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the user' }); // Send error response
  }
};


// controllers/userController.js


exports.createTask = async (req, res) => {
  console.log('create-task endpoint hit');
  try {
    const { task, voucher_amount, is_approved, uuid } = req.body;

    if (!task || !voucher_amount) {
      return res.status(400).json({ message: 'Task name and voucher amount are required.' });
    }

    // Call the service function to create the task
    const newTask = await userService.createTask(task, voucher_amount, is_approved, uuid);

    return res.status(201).json({
      message: 'Task created successfully!',
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while creating the task at createTask.' });
  }
};


// Controller method to get all tasks
exports.getTasks = async (req, res) => {
  try {
    // Call the service function to fetch tasks
    const tasks = await userService.getAllTasks();

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    return res.status(200).json({
      tasks: tasks,
    });
  } catch (error) {
    console.error('Error getting tasks:', error);
    return res.status(500).json({ message: 'An error occurred while fetching tasks' });
  }
};


// userController.js
exports.approveTask = async (req, res) => {
  const { taskName } = req.params;

  try {
    const result = await userService.approveTask(taskName);
    if (result) {
      res.status(200).json({ message: 'Task approved successfully' });
    } else {
      res.status(400).json({ message: 'Task approval failed or UUID is 0' });
    }
  } catch (error) {
    console.error('Error approving task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.cancelTask = async (req, res) => {
  const { taskName } = req.params;

  try {
    const result = await userService.cancelTask(taskName);
    if (result) {
      res.status(200).json({ message: 'Task canceled successfully' });
    } else {
      res.status(400).json({ message: 'Task cancellation failed' });
    }
  } catch (error) {
    console.error('Error canceling task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// // Controller method to cancel a task
// exports.cancelTask = async (req, res) => {
//   const { taskId } = req.params;

//   try {
//     const result = await userService.cancelTask(taskId);
//     if (result) {
//       return res.status(200).json({ success: true, message: 'Task canceled successfully.' });
//     } else {
//       return res.status(404).json({ success: false, message: 'Task not found.' });
//     }
//   } catch (error) {
//     console.error('Error canceling task:', error);
//     return res.status(500).json({ success: false, message: 'An error occurred while canceling the task.' });
//   }
// };

// // Controller method to approve a task
// exports.approveTask = async (req, res) => {
//   const { taskId } = req.params;

//   try {
//     const result = await userService.approveTask(taskId);
//     if (result) {
//       return res.status(200).json({ success: true, message: 'Task approved successfully.' });
//     } else {
//       return res.status(404).json({ success: false, message: 'Task not found or UUID is 0.' });
//     }
//   } catch (error) {
//     console.error('Error approving task:', error);
//     return res.status(500).json({ success: false, message: 'An error occurred while approving the task.' });
//   }
// };



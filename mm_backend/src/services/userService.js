const jwt = require('jsonwebtoken');

// Hardcoded credentials
const hardcodedUser = 'admin';  
const hardcodedPassword = 'admin';  
const secretKey = process.env.JWT_SECRET;  

// login
exports.login = async function (user, password) {
  try {
    // Compare the provided user and password with hardcoded values
    if (user === hardcodedUser && password === hardcodedPassword) {
      // If credentials are valid, create a JWT token
      const token = jwt.sign(
        { username: user },
        secretKey,
        { expiresIn: '1h' }  
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

exports.updateUserInfoById = async function (id, body) {
  console.log(`Updating user ${id} with data:`, body);
  return { success: true };  // Mock response
};

// get all users
exports.getAllUsers = async function () {
  const mockUsers = [
    { id: 1, username: 'admin' },
    { id: 2, username: 'admin2' }
  ];

  return mockUsers;  
};


// controllers/userController.js

const userService = require('../services/userService'); // Import service

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

const db = require('../dbConfig');  // Import the database connection

exports.createTask = async (taskName, voucherAmount, isApproved = false, uuid = 0) => {
  try {
    // SQL query to insert the task into the tasks table
    const query = `
      INSERT INTO tasks (task, voucher_amount, is_approved, uuid)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [taskName, voucherAmount, isApproved, uuid];

    // Execute the query
    const result = await db.query(query, values);

    // Return the created task
    return result.rows[0];
  } catch (error) {
    throw new Error('Error while saving the task: ' + error.message);
  }
};


exports.getAllTasks = async () => {
  try {
    const result = await db.query('SELECT * FROM tasks'); 
    return result.rows; 
  } catch (error) {
    console.error('Error querying tasks:', error);
    throw error;
  }
};


exports.approveTask = async (taskName) => {
  try {
    const result = await db.query('SELECT * FROM tasks WHERE task = $1', [taskName]);
    const task = result.rows[0];
    if (!task || task.uuid === 0) {
      return false; // Task not found or UUID is 0
    }

    await db.query('UPDATE tasks SET is_approved = $1 WHERE task = $2', [true, taskName]);
    return true;
  } catch (error) {
    console.error('Error approving task:', error);
    throw error;
  }
};

exports.cancelTask = async (req, res) => {
  const { taskName } = req.params;  // Access taskName parameter

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



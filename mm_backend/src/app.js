const express = require("express");
const app = express();
const sensorRoutes = require("./routes/sensorRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("../config");
const db = require('./dbConfig');
const bcrypt = require('bcrypt');

// const sessionParser = require('./sessionConfig');


// Middleware
app.use(express.json());
app.use(cookieParser());
//app.use(cors());
app.use(
	cors({
		origin: config.clientOrigin, // Replace with your frontend URL
		credentials: true,
	})
);
console.log("config.clientOrigin", config.clientOrigin);

// Login Route
// app.post('/api/login', async (req, res) => {
// 	const { user, password } = req.body;

// 	console.log('Request body:', req.body);
  
// 	try {
// 	  // Fetch user from the database
// 	  const result = await db.query('SELECT * FROM users WHERE username = $1', [user]);
// 	  const userData = result.rows[0];
  
// 	  if (!userData) {
// 		return res.status(401).json({ message: 'Invalid credentials' });
// 	  }
  
// 	  // Compare password with the hashed password in the database
// 	  const passwordMatch = await bcrypt.compare(password, userData.password);
  
// 	  if (!passwordMatch) {
// 		return res.status(401).json({ message: 'Invalid credentials' });
// 	  }
  
// 	  // Create JWT Token
// 	  const token = jwt.sign(
// 		{ userId: userData.id, username: userData.username },
// 		process.env.JWT_SECRET,
// 		{ expiresIn: '1h' }
// 	  );
  
// 	  // Send response with JWT
// 	  res.cookie('token', token, {
// 		httpOnly: true,
// 		secure: false, // Set to true if using HTTPS
// 		maxAge: 3600000, // 1 hour
// 		sameSite: 'Lax',
// 	  });
  
// 	  return res.status(200).json({ user: { username: userData.username, email: userData.email } });
  
// 	} catch (error) {
// 	  console.error('Error logging in:', error);
// 	  return res.status(500).json({ message: 'Error logging in' });
// 	}
//   });

app.post('/api/login', async (req, res) => {
    try {
        const { user, password } = req.body;

        // Query for the user
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [user];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const storedHashedPassword = result.rows[0].password;

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, storedHashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Routes
app.use("/api/sensors", sensorRoutes);
app.use("/api/users", userRoutes);
// console.log(userRoutes);  


// app.use("/api/login", loginRoutes);
// console.log(loginRoutes);  

module.exports = app;

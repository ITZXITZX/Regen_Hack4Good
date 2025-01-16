const express = require("express");
const app = express();
const sensorRoutes = require("./routes/sensorRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("../config");

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

// Routes
app.use("/api/sensors", sensorRoutes);
app.use("/api/user", userRoutes);
module.exports = app;

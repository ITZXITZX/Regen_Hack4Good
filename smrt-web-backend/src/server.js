const app = require("./app.js");
require("dotenv").config();

// constants
const port = process.env.PORT;

// start server
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

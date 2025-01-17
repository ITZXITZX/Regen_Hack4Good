// include environment variables
require("dotenv").config();

const config = {
	development: {
		clientOrigin: "http://localhost:3000",
		serverOrigin: "http://localhost:4000/api",
	},
	production: {
		clientOrigin: process.env.WEBAPP_DOMAIN,
		serverOrigin: process.env.WEBAPP_DOMAIN + "/api",
	},
};

const environment = process.env.NODE_ENV || "development";

module.exports = config[environment];

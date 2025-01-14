module.exports = {
	apps: {
		name: "smrt_dashboard",
		script: "npm run start",
		watch: true,
		autorestart: true,
		instances: 1,
		restart_delay: 1000, // Delay between restarts (in milliseconds)
	},
};

const session = require("express-session");
const connectPgSimple = require("connect-pg-simple")(session);

// Generate secure configurations
const isProduction = process.env.NODE_ENV === "production"; // Check if environment is production
const sessionSecret = process.env.SESSION_SECRET || require('crypto').randomBytes(64).toString('hex'); // Generate or fetch secret

const sessionConfig = session({
  store: new connectPgSimple({
    conObject: {
      user: process.env.DB_USER,       // Database username
      host: process.env.DB_HOST,       // Database host
      database: process.env.DB_NAME,   // Database name
      password: process.env.DB_PASSWORD, // Database password
      port: process.env.DB_PORT || 5432, // Default PostgreSQL port
    },
    tableName: "session", // Optional: Custom table name for sessions
  }),
  secret: sessionSecret, // Secure random string
  resave: false,         // Avoid resaving unchanged sessions
  saveUninitialized: false, // Do not save empty sessions
  cookie: {
    secure: isProduction,  // Use secure cookies in production
    httpOnly: true,        // Prevent client-side JavaScript from accessing the cookie
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    sameSite: isProduction ? "none" : "lax", // Allow cross-site cookies in production, restrict in dev
  },
});

module.exports = sessionConfig;

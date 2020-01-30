const {NODE_ENV } = require("./app");

const ONE_HOUR = 1000 * 60 * 60;
const { SESSION_NAME, SESSION_SECRET } = process.env;


exports.SESSION_OPTIONS = {
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: ONE_HOUR,
      // sameSite: 'none',
      secure: NODE_ENV === "production"
  }
}
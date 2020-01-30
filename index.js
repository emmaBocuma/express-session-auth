const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const Redis = require("ioredis");
const connectRedis = require("connect-redis");
require("dotenv").config();

require("./db/mongoose");

const { REDIS_OPTIONS, APP, SESSION } = require("./config");
const { login, logout, signup, isAuthed } = require("./controllers/auth");
const { signupValidator, validateAll } = require("./validators/auth");

const app = express();

if (APP.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.urlencoded({ extended: true }));
}

app.use(morgan("short"));
app.use(express.json());

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);
const store = new RedisStore({ client });
app.use(session({ ...SESSION.SESSION_OPTIONS, store }));

app.get("/isAuthed", isAuthed);

app.post("/logout", logout);

app.post("/login", login);

app.post("/signup", signupValidator, validateAll, signup);

app.listen(APP.PORT, () => {
  console.log(`Server running on port ${APP.PORT}`);
});
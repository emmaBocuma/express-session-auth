const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const Redis = require("ioredis");
const connectRedis = require("connect-redis");

require("./db/mongoose");

const { REDIS_OPTIONS, PORT, NODE_ENV, SESSION_OPTIONS } = require("./config");
const { login, logout, signup, isAuthed } = require("./controllers/auth");
const { signupValidator } = require("./validators/auth");
const { validateAll } = require("./validators");

const app = express();

if (NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.urlencoded({ extended: true }));
}

app.use(morgan("short"));
app.use(express.json());

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);
client.on("connect", () => console.log("Connected to Redis"));
client.on("error", err => {
  console.log("Redis error:", err);
});
const store = new RedisStore({ client });
app.use(session({ ...SESSION_OPTIONS, store }));

app.get("/isAuthed", isAuthed);

app.post("/logout", logout);

app.post("/login", login);

app.post("/signup", signupValidator, validateAll, signup);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

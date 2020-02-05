const {
  // REDIS_PORT = 6379,
  REDISCLOUD_URL = "localhost",
  REDIS_PASSWORD = "auth",
} = process.env;

exports.REDIS_OPTIONS = {
  // port: REDIS_PORT,
  host: REDISCLOUD_URL,
  // password: REDIS_PASSWORD,
};

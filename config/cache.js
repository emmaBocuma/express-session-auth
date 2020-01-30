const {
  REDIS_PORT = 6379,
  REDIS_HOST= "localhost",
  REDIS_PASSWORD= "auth",
} = process.env;

exports.REDIS_OPTIONS = {
  port: REDIS_PORT,
  host: REDIS_HOST,
  // password: REDIS_PASSWORD,
}
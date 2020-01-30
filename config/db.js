const { MONGO_URI } = process.env;

exports.MONGO_URI = MONGO_URI;

exports.MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
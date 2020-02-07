const { MONGO_URI } = process.env;

module.exports = {
  MONGO_URI,
  MONGO_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

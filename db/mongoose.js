const mongoose = require("mongoose");
const { MONGO_URI, MONGO_OPTIONS } = require("../config/db");

mongoose.connect(MONGO_URI, MONGO_OPTIONS);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to mongo db");
});

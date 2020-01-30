const mongoose = require("mongoose");
const { DB } = require("../config");

mongoose.connect(DB.MONGO_URI, DB.MONGO_OPTIONS);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() { console.log("Connected to mongo db"); });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    max: 64,
  },
  password: {
    type: String,
    required: true,
    max: 64,
  },
});

userSchema.pre("save", async function(next) {
  const user = this;
  const SALT_FACTOR = 12;

  if (!user.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(user.password, SALT_FACTOR);
    user.password = hash;
    next();
  } catch (e) {
    return next(e);
  }
});

userSchema.statics.findByCredentials = async function(email, password) {
  console.log("findByCredentials");
  const authErrorMessage = "User and password combination not found";
  const user = await this.findOne({ email });

  console.log(user);
  if (!user) {
    throw new Error(authErrorMessage);
  }

  const passwordVerified = await user.comparePassword(password);
  if (!passwordVerified) {
    throw new Error(authErrorMessage);
  }

  return user;
};

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

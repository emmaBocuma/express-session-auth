const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        max: 64
    },
    password: {
        type: String,
        required: true,
        max: 64
    }
});

userSchema.pre("save", function(next) {
    const user = this;
    const SALT_FACTOR = 12;

    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, SALT_FACTOR, function(err, hash) {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

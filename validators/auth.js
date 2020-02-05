const { check } = require("express-validator");

exports.signupValidator = [
  check("email")
    .isEmail()
    .withMessage("Must be valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

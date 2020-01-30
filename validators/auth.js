const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("email")
    .isEmail()
    .withMessage("Must be valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateAll = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array()[0].msg);
  }
  next();
};

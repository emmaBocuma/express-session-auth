const { validationResult } = require("express-validator");

exports.validateAll = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array()[0].msg);
  }
  next();
};

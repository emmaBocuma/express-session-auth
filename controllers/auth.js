const User = require("../models/user");

exports.isAuthed = (req, res) => {
  const { userId } = req.session;
  console.log("++++++++++++++++++++++");
  console.log(req.session);

  if (!userId) {
    return res.status(401).send("Not authorised");
  }

  return res.status(200).send("Success");

  // User.findOne({ _id: userId }, (err, user) => {
  //     if (err || !user) {
  //         return res.status(401).json({
  //             error: "Not authorised"
  //         });
  //     }

  //     console.log("success")
  //     return res.status(200).send("Success");
  // });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {});
  res.clearCookie(process.env.SESS_NAME);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const authErrorMessage = "User and password combination not found";

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).send(authErrorMessage);
    }

    const passwordVerified = await user.comparePassword;
    if (!passwordVerified) {
      return res.status(422).send(authErrorMessage);
    }
    req.session.userId = user._id;
    res.status(200).send("Success");
  } catch (e) {
    return res.status(500).send("Database error");
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send("Email taken.");
    }

    await new User({ email, password }).save();
    res.status(201).send("Success");
  } catch (e) {
    res.status(500).send("Database error");
  }
};

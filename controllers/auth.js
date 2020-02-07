const User = require("../models/user");

exports.isAuthed = (req, res) => {
  const { userId } = req.session;
  console.log("++++++++++++++++++++++");
  console.log(req.session);

  if (!userId) {
    return res.status(401).send("Not authorised");
  }

  //   User.findOne({ _id: userId }, (err, user) => {
  //     if (err || !user) {
  //         return res.status(401).json({
  //             error: "Not authorised"
  //         });
  //     }

  //     console.log("success")
  //     return res.status(200).send("Success");
  // });

  return res.status(200).send("Success");
};

exports.logout = (req, res) => {
  req.session.destroy(err => {});
  res.clearCookie(process.env.SESS_NAME);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    req.session.userId = user._id;
    res.status(200).send("Success");
  } catch (e) {
    return res.status(400).send(e);
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
    req.session.userId = user._id;
    res.status(201).send("Success");
  } catch (e) {
    res.status(500).send(e);
  }
};

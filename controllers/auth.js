const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        ok: false,
        msg: "Someone already is using this email",
      });

    user = new User(req.body);
    //Hashing password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Something went wrong :(",
    });
  }
};

const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        ok: false,
        msg: "Email or password incorrect",
      });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res.status(401).json({
        ok: false,
        msg: "Email or password incorrect",
      });

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Something went wrong :(",
    });
  }
};

const renewToken = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};

const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res = response) => {
  try {
    const { mail, password } = req.body;

    let user = await User.findOne({ mail });
    if (user)
      res.status(400).json({
        ok: false,
        msg: "Someone already is using this email",
      });

    user = new User(req.body);
    //Hashing password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong :(",
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};

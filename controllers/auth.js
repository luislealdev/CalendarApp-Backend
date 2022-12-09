const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { getJWT } = require("../helpers/getJWT");

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
    //Generates jsonwebtoken
    const token = await getJWT(user._id, user.name);

    return res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
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

    //Generates jsonwebtoken
    const token = await getJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Something went wrong :(",
    });
  }
};

const renewToken = async (req, res = response) => {
  const token = await getJWT(req.id, req.name);

  return res.json({
    ok: true,
    token,
  });
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};

const { response } = require("express");

const registerUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: "new",
  });
};

const loginUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: "login",
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
  renewToken
};

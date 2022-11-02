/*
host + api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser, renewToken } = require("../controllers/auth");
const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;

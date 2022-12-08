/*
host + api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { registerUser, loginUser, renewToken } = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validarCampos,
  ],
  registerUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;

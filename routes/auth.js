/*
host + api/auth
*/
const { Router } = require("express");
const { registerUser, loginUser, renewToken } = require("../controllers/auth");
const router = Router();

router.post("/new", registerUser);

router.post("/", loginUser);

router.get("/renew", renewToken);

module.exports = router;

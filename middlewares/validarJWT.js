const jwt = require("jsonwebtoken");
const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.json({
      ok: false,
      msg: "There is no json web token",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_secret);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
  next();
};

module.exports = {
  validarJWT,
};

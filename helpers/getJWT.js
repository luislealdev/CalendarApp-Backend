const jwt = require("jsonwebtoken");

const getJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.JWT_secret,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("It couldnt generate the jsonwebtoken");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  getJWT,
};

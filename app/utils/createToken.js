const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id: id }, config.secret, {
    expiresIn: 172800, // 48 hours
  });
};
module.exports = createToken;

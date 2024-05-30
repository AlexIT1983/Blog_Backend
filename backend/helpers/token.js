// Helper for generate Token
const jwt = require("jsonwebtoken");

const sign = process.env.JWT_SECRET; // подпись

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    return jwt.verify(token, sign);
  },
};

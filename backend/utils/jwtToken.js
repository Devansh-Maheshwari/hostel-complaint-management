const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(email, type) {
  const payload = {
    user: {
      email,
      type
    }
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function jwtDecoder(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

exports.jwtDecoder = jwtDecoder;
exports.jwtGenerator = jwtGenerator;
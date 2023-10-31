const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    // we used req.headers for sending tokens
    const token = req.headers.authorization.split(" ")[1]; // Bearer $2@363872
    const decodeToken = jwt.verify(token, "secretKey");
    // we need to append the data to the request
    req.userData = decodeToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: error,
    });
  }
};

module.exports = {checkAuth}
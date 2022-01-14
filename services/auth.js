const verifyToken = require("./token");

const checkAuthToken = (req, res, next) => {
  // console.log(req.headers);
  if (req.headers.authorization) {
    const token = verifyToken.verifyToken(req.headers.authorization);
    //    console.log(token)
    next();
  } else {
    res.status(400).json({ message: "Failed to authenticate token" });
  }
};

module.exports = {
  checkToken: checkAuthToken,
};

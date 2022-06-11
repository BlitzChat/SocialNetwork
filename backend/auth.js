const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
        }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
}
module.exports = verifyToken
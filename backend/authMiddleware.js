const jwt = require("jsonwebtoken")
const { verifyToken } = require("../utils/token")

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")
  if (!token) return res.status(401).json({ message: "Access denied" })

  jwt.verify(token, "mobeen001", (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" })
    req.user = user
    next()
  })
}

module.exports = {
  authenticateToken,
}

const jwt = require("jsonwebtoken")

const secretKey = "mobeen001"

const generateToken = (id) => jwt.sign({ id }, secretKey)

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey)
  } catch (error) {
    console.log("Error : ", error)
  }
}

module.exports = {
  generateToken,
  verifyToken,
}

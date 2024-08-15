const nodemailer = require("nodemailer")

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mobeen@gmail.com",
    pass: "dummypasskey",
  },
})

module.exports = { transporter }

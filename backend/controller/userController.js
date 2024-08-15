const User = require("../models/User")
const { transporter } = require("../utils/nodemailer")
const { generateOTP } = require("../utils/otpGenerator")
const { generateToken } = require("../utils/token")

// create a user
const createUser = async (req, res) => {
  try {
    // Insert a single data record
    const { name, email, password, address, phoneNumber, idCard, picture } =
      req.body

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" })
    }

    const user = await User.create({
      name,
      email,
      password,
      otp: "001",
      isEmailVerified: false,
      address,
      phoneNumber,
      cardNumber: "1234", //idCard || "",
      picture: picture || "",
    })
    const token = generateToken(user.id)
    // Respond with a success message
    res.json({ message: "User registered successfully", user, token })
  } catch (error) {
    console.error(
      "------------------Error while registering user:--------jkjkjkjk---------",
      error
    )
    res.status(500).json({ message: "Error registering user" })
  }
}

// signin user
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log("USER : ", email, password)

    // Find the user in the database by email
    const user = await User.findOne({ where: { email } })

    // If the user doesn't exist or the password is incorrect, send an error response
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid  credentials" })
    }

    // Generate a JWT token with user ID as the JWT ID
    // const token = generateToken(user.id);

    // Respond with a success message and the JWT token
    res.status(200).json({ message: "Authentication successful", user })
  } catch (error) {
    console.error("Error during login:", error)
    res.status(500).json({ message: "Login error" })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    res.status(200).json({ message: "User fetched successfully", user })
  } catch (error) {
    console.error("Error while fetching user", error)
    res.status(500).json({ message: "Error while fetching user" })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.destroy({ where: { id } })
    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error while deleting user", error)
    res.status(500).json({ message: "Error while deleting user" })
  }
}

module.exports = { createUser, signInUser, getUserById, deleteUser }

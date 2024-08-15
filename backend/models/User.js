const { DataTypes } = require("sequelize")
const sequelize = require("../db/sequelize.js") // Adjust the path as needed
const Service = require("./Service.js")

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING,
  },
})

// Define the association
User.hasMany(Service, { foreignKey: "fk_user_id" })

module.exports = User

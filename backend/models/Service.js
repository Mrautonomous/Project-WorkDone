const { DataTypes } = require("sequelize")
const sequelize = require("../db/sequelize.js") // Adjust the path as needed
const User = require("./User.js")

const Service = sequelize.define("Service", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  condition: {
    type: DataTypes.STRING,
  },
  fk_user_id: {
    type: DataTypes.INTEGER,
  },
})

// Define the association
Service.associate = (models) => {
  Service.belongsTo(models.User, { foreignKey: "fk_user_id" })
}
module.exports = Service

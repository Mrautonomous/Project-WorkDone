// sequelize.js

const Sequelize = require("sequelize")

const sequelize = new Sequelize("ihtisham", "root", "root", {
  host: "localhost",
  dialect: "mysql",
})

// Add a logging option to log database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

module.exports = sequelize

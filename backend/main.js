const express = require("express")
const app = express()
var cors = require("cors")
const sequelize = require("./db/sequelize")
const userRoutes = require("./routes/users")
const serviceRoutes = require("./routes/service")
// Use force:true to recreate tables (use with caution in development)
// sequelize.sync({ force: true })

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.")
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error)
  })

app.use(cors())
// Middleware to parse JSON requests
app.use(express.json())

// Use the user routes
app.use("/users", userRoutes)
app.use("/product", serviceRoutes)

// Define a simple route to send a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to your Express, Sequelize, and MySQL project!")
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

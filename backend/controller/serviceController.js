const Service = require("../models/Service")
const User = require("../models/User")

// create a service
const createService = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      title,
      description,
      address,
      category,
      phoneNumber,
      fk_user_id,
      condition,
    } = req.body

    // check if user exists
    const existingUser = await User.findOne({ where: { id: fk_user_id } })

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" })
    }

    const service = await Service.create({
      name,
      price,
      image,
      title: "",
      description,
      address,
      category,
      phoneNumber,
      fk_user_id,
      condition: "",
    })

    res.json({ message: "Service created successfully", service })
  } catch (error) {
    console.error("Error while creating service:", error)
    res.status(500).json({ message: "Error creating service" })
  }
}

// get service by id
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params

    // Find the service in the database
    const product = await Service.findOne({ where: { id } })

    // If the service doesn't exist, send an error response
    if (!product) {
      return res.status(404).json({ message: "Service not found" })
    }

    // Respond with the service data
    res.json({ product })
  } catch (error) {
    console.error("Error while getting service:", error)
    res.status(500).json({ message: "Error getting service" })
  }
}

// delete service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params

    // Find the service in the database
    const product = await Service.findOne({ where: { id } })

    // If the service doesn't exist, send an error response
    if (!product) {
      return res.status(404).json({ message: "Service not found" })
    }

    // Delete the service
    await product.destroy()

    // Respond with a success message
    res.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("Error while deleting service:", error)
    res.status(500).json({ message: "Error deleting service" })
  }
}

// get services by user id
const getServicesByUserId = async (req, res) => {
  try {
    const { id } = req.params

    // Find the user in the database
    const user = await User.findOne({ where: { id } })

    // If the user doesn't exist, send an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find the services associated with the user
    const products = await Service.findAll({ where: { fk_user_id: id } })

    // Respond with the services data
    res.json({ products })
  } catch (error) {
    console.error("Error while getting services:", error)
    res.status(500).json({ message: "Error getting services" })
  }
}

// get all services
const getAllServices = async (req, res) => {
  try {
    // Find all services in the database
    const products = await Service.findAll()

    // Respond with the services data
    res.json({ products })
  } catch (error) {
    console.error("Error while getting services:", error)
    res.status(500).json({ message: "Error getting services" })
  }
}

module.exports = {
  createService,
  getServiceById,
  deleteService,
  getServicesByUserId,
  getAllServices,
}

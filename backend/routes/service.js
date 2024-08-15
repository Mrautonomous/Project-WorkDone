const express = require("express")
const router = express.Router()
const {
  createService,
  getServiceById,
  deleteService,
  getServicesByUserId,
  getAllServices,
} = require("../controller/serviceController")
const { get } = require("mongoose")

// Create Service
router.post("/create", createService)

// get single service
router.get("/:id", getServiceById)

// delete service
router.delete("/:id", deleteService)

// get services by user id
router.get("/user/:id", getServicesByUserId)

// get all services
router.get("/", getAllServices)

module.exports = router

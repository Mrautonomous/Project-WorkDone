const express = require('express');
const router = express.Router();
const {
  createUser,
  signInUser,
  getUserById,
  deleteUser,
} = require('../controller/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Create User
router.post('/register', createUser);

// Login User
router.post('/login', signInUser);
// get single user
router.get('/:id', getUserById);

// delete user
router.delete('/:id', deleteUser);

// Define a protected route that requires authentication
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;

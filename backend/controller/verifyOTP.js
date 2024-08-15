const User = require('../models/User');

// Controller function for OTP verification
async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Check if the provided OTP matches the stored OTP
    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Update the user's email verification status to true
    user.isEmailVerified = true;
    await user.save();

    // Respond with a success message
    res.json({ message: 'Email verification successful', user });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'OTP verification error' });
  }
}

module.exports = {
  verifyOTP,
};

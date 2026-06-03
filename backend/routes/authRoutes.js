const express = require("express");
const User = require("../models/User");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateAvailability,
  updateProfile,
  resetPassword,
} = require(
  "../controllers/authController"
);


// REGISTER

router.post(
  "/register",
  registerUser
);


// LOGIN

router.post(
  "/login",
  loginUser
);


// UPDATE AVAILABILITY

router.put(
  "/availability/:id",
  updateAvailability
);


// UPDATE PROFILE

router.put(
  "/profile/:id",
  updateProfile
);


// RESET PASSWORD

router.put(
  "/reset-password",
  resetPassword
);

//notification route 

router.put(
  "/save-token",
  async (req, res) => {
    const {
      userId,
      pushToken,
    } = req.body;

    await User.findByIdAndUpdate(
      userId,
      {
        pushToken,
      }
    );

    res.json({
      success: true,
    });
  }
);
module.exports = router;
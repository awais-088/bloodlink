const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER USER

const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      city,
      role,
      bloodGroup,
    } = req.body;

    // CHECK EXISTING USER

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // HASH PASSWORD

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // CREATE USER

    const newUser =
      await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        city,
        role,
        bloodGroup,
      });

    res.status(201).json({
      message:
        "User registered successfully",

      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN USER

const loginUser = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    // FIND USER

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    // COMPARE PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    // CREATE TOKEN

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message:
        "Login successful",

      token,

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateAvailability =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      user.available =
        req.body.available;

      await user.save();

      res.status(200).json({
        message:
          "Availability updated",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  const updateProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      user.name =
        req.body.name ||
        user.name;

      user.city =
        req.body.city ||
        user.city;

      user.phone =
        req.body.phone ||
        user.phone;

      user.profileImage =
        req.body.profileImage ||
        user.profileImage;

      await user.save();

      res.status(200).json({
        message:
          "Profile updated successfully",

        user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const resetPassword =
  async (req, res) => {
    try {
      const user =
        await User.findOne({
          email:
            req.body.email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      const salt =
  await bcrypt.genSalt(10);

user.password =
  await bcrypt.hash(
    req.body.newPassword,
    salt
  );

await user.save();

      res.status(200).json({
        message:
          "Password updated",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
module.exports = {
  registerUser,
  loginUser,
  updateAvailability,
  updateProfile,
  resetPassword,
};
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (req.body.name !== undefined) {
  user.name = req.body.name;
}

if (req.body.phone !== undefined) {
  user.phone = req.body.phone;
}

if (req.body.monthlySalary !== undefined) {
  user.monthlySalary = req.body.monthlySalary;
}

if (req.body.currency !== undefined) {
  user.currency = req.body.currency;
}

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const {
      oldPassword,
      newPassword,
    } = req.body;

    if (!oldPassword || !newPassword) {
  return res.status(400).json({
    success: false,
    message: "Both passwords are required",
  });
}

if (oldPassword === newPassword) {
  return res.status(400).json({
    success: false,
    message:
      "New password must be different from old password",
  });
}

if (newPassword.length < 6) {
  return res.status(400).json({
    success: false,
    message:
      "Password must be at least 6 characters",
  });
}

    const user = await User.findById(req.user._id);

    const match = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Old Password Incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
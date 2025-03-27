const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.model");
const salt = bcrypt.genSaltSync(10);
const SECRET = process.env.SECRET;
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      accessToken: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Authentication Failed" });
  }
};
exports.register = async (req, res) => {
  const { fullName, password, email, phoneNumber } = req.body;

  if (!fullName || !password || !email || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something went wrong while registering a new user",
    });
  }
};

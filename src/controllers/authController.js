const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    console.log("Registration attempt with body:", req.body);
    const { firstName, lastName, email, password, position } = req.body;

    if (!firstName || !lastName || !email || !password || !position) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      position,
    });

    console.log("Attempting to save new user:", newUser);

    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);

    res
      .status(201)
      .json({ message: "User registered successfully", userId: savedUser._id });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      console.error("Duplicate key error. Details:", error.keyValue);
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `User with this ${duplicateField} already exists`,
        field: duplicateField,
      });
    }
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

exports.login = (req, res) => {
  res.json({ message: "Login successful", user: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
};

const express = require("express");
const { authMiddleware, hardcodedAuth } = require("../middleware/authMiddleware");
const User = require("../models/user");
const router = express.Router();

router.post("/auth/login", hardcodedAuth);

router.post("/auth/signup", async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      name,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
});

module.exports = router;
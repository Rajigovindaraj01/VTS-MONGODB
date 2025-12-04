const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");

// CREATE USER (POST)
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Basic invalid ID check
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid MongoDB ID" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

// UPDATE USER (PUT/PATCH)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid MongoDB ID" });
  }

  try {
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "User not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid MongoDB ID" });
  }

  const deleted = await User.findByIdAndDelete(id);

  if (!deleted) return res.status(404).json({ error: "User not found" });

  res.json({ message: "User deleted successfully" });
});

module.exports = router;

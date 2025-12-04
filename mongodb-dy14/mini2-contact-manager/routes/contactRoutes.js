const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

// CREATE CONTACT (POST)
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL CONTACTS
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// GET CONTACT BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid Contact ID" });

  const contact = await Contact.findById(id);
  if (!contact)
    return res.status(404).json({ error: "Contact not found" });

  res.json(contact);
});

// UPDATE CONTACT (PATCH)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid Contact ID" });

  try {
    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ error: "Contact not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE CONTACT
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid Contact ID" });

  const deleted = await Contact.findByIdAndDelete(id);

  if (!deleted)
    return res.status(404).json({ error: "Contact not found" });

  res.json({ message: "Contact deleted successfully" });
});

module.exports = router;

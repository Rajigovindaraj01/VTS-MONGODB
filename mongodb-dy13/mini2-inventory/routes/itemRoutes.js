const express = require("express");
const router = express.Router();
const Item = require("../models/Item");


// CREATE item
router.post("/items", async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json({ message: "Item added", data: item });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all items
router.get("/items", async (req, res) => {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
});

// DELETE item
router.delete("/items/:id", async (req, res) => {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted", data: deleted });
});

module.exports = router;
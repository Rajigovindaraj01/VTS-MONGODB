const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// CREATE CONTACT
router.post('/contacts', async (req, res) => {
    try {
        const { name, email, phone, notes, message } = req.body;

        const contact = new Contact({
            name,
            email,
            phone,
            notes,
            message
        });

        await contact.save();

        return res.status(201).json({
            message: 'Contact Created',
            data: contact
        });

    } catch (err) {

        if (err.code === 11000 && err.keyPattern?.email) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ error: messages.join(', ') });
        }

        return res.status(500).json({ error: err.message });
    }
});

// GET CONTACTS
router.get('/contacts', async (req, res) => {
    try {
        const { search = '', limit = 20, page = 1 } = req.query;

        const q = search.trim()
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const perPage = Math.max(1, parseInt(limit) || 20);
        const currentPage = Math.max(1, parseInt(page) || 1);

        const [contacts, total] = await Promise.all([
            Contact.find(q)
                .sort({ createdAt: -1 })
                .skip((currentPage - 1) * perPage)
                .limit(perPage),

            Contact.countDocuments(q)
        ]);

        return res.json({
            meta: {
                total,
                page: currentPage,
                perPage,
                totalPages: Math.ceil(total / perPage)
            },
            data: contacts
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// DELETE CONTACT
router.delete('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Contact.findByIdAndDelete(id);

        if (!deleted)
            return res.status(400).json({ error: "Contact not found" });

        return res.json({
            message: 'Contact deleted',
            data: deleted
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;

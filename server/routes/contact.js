const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST /api/contact — save a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: 'All fields required' });

    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: '✅ Message received!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

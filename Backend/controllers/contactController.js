const Contact = require('../models/Contact');

exports.submitContact = async(req, res) => {
    try {
        const { firstName, lastName, email, phone, subject, message } = req.body;

        // Basic validation
        if (!email && !phone) {
            return res.status(400).json({ success: false, message: 'Email or phone is required' });
        }

        const contact = new Contact({ firstName, lastName, email, phone, subject, message });
        await contact.save();

        return res.status(201).json({ success: true, message: 'Contact saved', contact });
    } catch (err) {
        console.error('submitContact error', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
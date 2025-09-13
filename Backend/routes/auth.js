const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 */
router.post('/signup', async(req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Return user and simple token (JWT) for frontend convenience
        const userObj = newUser.toObject();
        delete userObj.password;
        const token = require('jsonwebtoken').sign({ id: newUser._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });

        res.status(201).json({ message: 'User registered successfully', user: userObj, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user without JWT
 */
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Send user data without password and token
        const { password: pwd, ...userData } = user.toObject();
        const token = require('jsonwebtoken').sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
        res.json({
            message: 'Login successful',
            user: userData,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
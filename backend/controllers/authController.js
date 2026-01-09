// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// SIGNUP
const signupController = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'Email or username already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            username,
            password: hashedPassword,
            // isAdmin: false by default from schema
        });

        const token = jwt.sign(
            {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                isAdmin: newUser.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Signup successful',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                isAdmin: newUser.isAdmin,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ message: 'Signup failed', error: err.message });
    }
};

// LOGIN
const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Or use email instead, but pick ONE and match frontend
        const user = await User.findOne({ username }); // 👈 await INSIDE async fn

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ message: 'Login failed', error: err.message });
    }
};

module.exports = {
    signupController,
    loginController,
};

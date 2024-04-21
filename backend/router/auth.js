const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await user.save();
        res.json({
            message: "User registered successfully",
            userId: savedUser._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('email, password: ', email, password);
        const user = await User.findOne({ email });
        console.log('user: ', user);
        if (!user) {
            return res.status(400).send("Invalid email or password.");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send("Invalid username or password.");
        }
        const token = jwt.sign({ userId: user.id }, 'userlogin');

        res.send({
            token,
            username: user.username,
            email: user.email,
        });
    } catch (error) {

    }
})

module.exports = router
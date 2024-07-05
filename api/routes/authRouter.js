const express = require('express')
const route = express.Router();

const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

route.use(cookieParser());

route.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.create({
            name: name,
            email: email,
            password: await bcrypt.hash(password, 12),
        })
        jwt.sign({ id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user);
        })
        console.log("CookiE:");
    } catch (err) {
        console.log("fail")
        console.log(err);
        res.status(405).json(err);
    }
})

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("login processing");
    const user = await User.findOne({ email });
    if (user) {
        console.log("comparing");
        if (await bcrypt.compareSync(password, user.password)) {
            jwt.sign({ id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(token);
            })
        } else {
            res.status(404).json("Incorrect username or password");
        }
    } else {
        res.status(404).json("User not found");
        console.log("Not found");
    }
})

route.post('/user', (req, res) => {
    const { token } = req.cookies;
    console.log(req.cookies)
    console.log("Called 1")

    if (token) {
        console.log("called")
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            const user = await User.findById(userData.id);
            res.json(user)
        })
    } else {
        console.log("No token");
        res.json(null)
    }
})

route.post('/logout', (req, res) => {
    res.cookie("token", '').json(true);
})

module.exports = route;

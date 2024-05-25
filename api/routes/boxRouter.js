const express = require('express');

const route = express.Router();

const Box = require("../models/box")
const User = require("../models/user")

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

route.use(cookieParser());

function getUserFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            const user = await User.findById(userData.id);
            resolve(user);
        });
    });
}

route.post('/create', async (req, res) => {
    const { name } = req.body;
    let code = Math.random() * 89999999 + 10000000;
    const { token } = req.cookies;
    const user = await getUserFromToken(req);
    console.log(user);
    let test = await Box.findOne({ code });
    console.log(test);
    while (test) {
        console.log("finding" + code);
        code = Math.floor(Math.random() * 90000000 + 10000000)
        test = await Box.findOne({ code });
    }
    console.log("Creating");
    try {
        const box = await Box.create({
            name: name,
            code: code,
            user: user._id,
        });
        res.json(box);
    } catch (err) {
        console.log("Error");
        res.json(err);
    }
});

module.exports = route;
const express = require('express');

const route = express.Router();

const Box = require("../models/box")

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

route.use(cookieParser());

function getUserFromToken(req) {
    const { token } = req.cookies;
    if (token) {
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            const user = await User.findById(userData.id);
            return user;
        })
    } else {
        console.log("No token");
        res.json(null)
    }
}

route.post('/create', async (req, res) => {
    const { name } = req.body;
    let code = Math.random() * 89999999 + 10000000;

    console.log(req);
    const { token } = req.cookies;
    console.log(token);
    const user = getUserFromToken(req);
    console.log(user);

    while (Box.findOne({ code })) {
        code = Math.random() * 89999999 + 10000000;
    }
    try {
        const box = await Box.create({
            name: name,
            code: code,
            user: user._id,
        });
    } catch (err) {
        res.json(err);
    }
})



module.exports = route;
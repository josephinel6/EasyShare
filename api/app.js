const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const User = require('./models/user');

require('dotenv').config();
const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    // origin: 'http://localhost:3000',
    origin: '*',
}));

app.use(cookieParser())

mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log("DB Connected")
    })

app.get('/', (req, res) => {
    res.json("Working");
    console.log("Working");
})

// function createToken(id) {
//     jwt.sign({ id: id }, process.env.JWT_SECRET, {}, (err, token) => {
//         if (err) throw err;
//         res.cookie('token', token).json(user);
//     })
// }

app.post('/register', async (req, res) => {
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
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        console.log("comparing");
        if (await bcrypt.compareSync(password, user.password)) {
            jwt.sign({ id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                console.log(token)
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

app.get('/user', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            console.log(userData)
            console.log(await User.findById(userData.id))
            res.json(userData);
            // const { name, email, boxes, _id } = await User.findById(userData.id);
            // console.log("id:" + userData.id)
            // console.log({ name, email, boxes, _id })
            // res.json({ name, email, boxes, _id })
        })
    } else {
        console.log("No token");
        res.json(null)
    }
})

app.listen(4000);
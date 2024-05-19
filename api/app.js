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

mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log("DB Connected")
    })

app.get('/', (req, res) => {
    res.json("Working");
})

function createToken(id) {
    jwt.sign({ id: id }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token);
    })
}

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name: name,
            email: email,
            password: await bcrypt.hash(password, 12),
        })
        createToken(user._id);
        res.json(user);
    } catch (err) {
        console.log(err);
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        console.log("comparing");
        if (await bcrypt.compareSync(password, user.password)) {
            createToken(user._id);
            res.json(user);
        } else {
            res.status(404).json("Incorrect username or password");
        }
    } else {
        res.status(404).json("User not found");
        console.log("Not found");
    }
})

app.listen(4000);
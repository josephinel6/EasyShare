const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const boxRouter = require('./routes/boxRouter');
const authRouter = require('./routes/authRouter');

require('dotenv').config();
const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001',
    // origin: '*',
}));

app.use('/box', boxRouter);
app.use('/', authRouter);

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

function getUserFromToken(token) {

}

app.listen(4000);
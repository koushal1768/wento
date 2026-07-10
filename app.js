const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./db/db');
const app = express();
const userRouter = require('./routes/user.routes');
const conn = connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', ( req,res)=>{

    res.send('hello world');
})
app.use('/users', userRouter);

module.exports = app;
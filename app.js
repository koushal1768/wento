const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./db/db');
const app = express();
const userRoutes = require('./routes/user.routes');
const conn = connectDB();
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', ( req,res)=>{

    res.send('hello world');
})
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


module.exports = app;
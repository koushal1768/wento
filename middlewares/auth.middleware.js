const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blacklistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token||req.header("Authorization").split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "No token, authorization denied"});
    }

    const blackListToken = await blackListTokenModel.findOne({token});
    if (blackListToken) {
        return res.status(401).json({message: "unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({message: "Token is not valid"});
        }
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({message: "Token is not valid"});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}
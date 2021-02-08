const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token) return res.status(401).json({
            msg: "No auth token, authorization denied"
        })
        const verified = jwt.verify(token, process.env.jwtSecret);
        if (!verified)
            return res
                .status(401)
                .json({
                    msg: "Token verification failed, authorization denied"
                });

        req.user = verified.user;
        next();
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = auth;
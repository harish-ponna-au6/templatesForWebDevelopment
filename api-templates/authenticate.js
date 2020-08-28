// Models
var User = require("../models/User");

// NPM packages
const { verify } = require("jsonwebtoken");

module.exports = {
    async authenticateUser(req, res, next) {
        try {
            const token = req.header('Authorization')
            if (!token) return res.json({ error: "no token found" })
            const payload = await verify(token, process.env.JSON_WEB_TOKEN_SECRET)
            if (!payload._id) {
                return res.json({ error: "invalid token" })
            }
            const user = await User.findOne({ _id: payload._id, jsonWebToken: token })
            if (!user) return res.json({ error: "no user account found" })
            req.user = user
            next()
        } catch (error) {
            res.json({ error: error.message })
        }
    }
}




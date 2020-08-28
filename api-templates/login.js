// NPM packages
const [{ sign }, { hash, compare }] = [require("jsonwebtoken"), require("bcryptjs")]

// Utils
const { forgotPasswordMailing } = require("../utils/nodeMailer")//for sending password to user through mail

module.exports = {
    //loggin into the account
    async login(req, res) {
        try {
            var email = req.body.email;
            var password = req.body.password;
            if (!email || !password) return res.json({ error: "Incorrect credentials" });
            const user = await User.findOne({ email });
            if (!user) return res.json({ error: "Incorrect credentials(email not found)" });
            const isMatched = await compare(password, user.password);
            if (!isMatched) return res.send({ error: "Incorrect credentials(password not matched)" });
            const token = await sign({ _id: user._id }, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: "1d" })
            user.jsonWebToken = token;
            user.save()
            return res.json({ data: [{}], jsonWebToken: token })
        }
        catch (error) {
            return res.json({ error: error.message })
        }
    },
// NPM Packages
const [{ sign }, { hash, compare }, { tz }] = [require("jsonwebtoken"), require("bcryptjs"), require('moment-timezone')]



module.exports = {
    //User registration
    async register(req, res) {
        try {
            var { name, email, password, officeName, mobile, address } = req.body
            mobile = Number(mobile)
            const emailCheck = await User.findOne({ email })
            if (emailCheck) return res.json({ error: "Duplicate Email" });
            const user = await new User({ name, email, password, officeName, mobile, address });
            const hashedPassword = await hash(password, 10);
            user.password = hashedPassword;
            user.save()
            res.json({ message: `Account created successfully` });
        }
        catch (error) {
            return res.json({ error: `${error.message}` });
        }
    },
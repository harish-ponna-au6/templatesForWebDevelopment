module.exports = {
    async logout(req, res) {
        try {
            await User.findOneAndUpdate({ _id: req.user._id }, { jsonWebToken: null })
            return res.json({ data: [{ message: "admin logged out successfully" }] });
        } catch (error) {
            res.status(404).send({ error: error.message })
        }
    },
}
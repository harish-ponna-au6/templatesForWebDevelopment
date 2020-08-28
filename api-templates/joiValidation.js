// NPM packages
const Joi = require("@hapi/joi");//validation package

module.exports = {
    async registrationValidation(req, res, next) {
        try {
            var { name, email, password, mobile } = req.body
            if (isNaN(mobile)) return res.json({ error: "mobiler number must be a valid number" })
            mobile = Number(mobile)
            const Schemavalidation = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password: Joi.string().min(3).max(30).required(),
                mobile: Joi.number().min(1000000000).max(9999999999).required(),
            })
            const { error } = Schemavalidation.validate({ name, email, password, officeName, mobile, address })
            if (error) return res.json({ error: error.message })
            else next()
        } catch (error) {
            res.json(error.message)
        }
    }

}
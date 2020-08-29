const Joi = require("@hapi/joi");

module.exports = {
  async registrationValidation(req, res, next) {
    try {
      var { name, email, password } = req.body;

      const Schemavalidation = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "in"] }
        }),
        password: Joi.string().min(4).max(30).required()
      });
      const { error } = Schemavalidation.validate({
        name,
        email,
        password
      });
      if (error)
        return res.status(400).json({ error: { message: error.message } });
      else next();
    } catch (error) {
      res.status(500).json({ error: { message: error.message } });
    }
  }
};

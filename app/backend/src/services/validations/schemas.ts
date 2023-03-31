import Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().min(6).email(),
  password: Joi.string().min(6),
});

const schemas = { loginSchema };
export default schemas;

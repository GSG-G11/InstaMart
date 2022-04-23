import Joi from 'joi';

const logInValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).required(),
});

export default logInValidation;

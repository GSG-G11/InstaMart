import { Request } from 'express';
import Joi from 'joi';

const signupValidation = (req: Request) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    confirmPassword: Joi.ref('password'),
    email: Joi.string().email().required(),
  });
  return schema.validateAsync(req.body);
};

export default signupValidation;

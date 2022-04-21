import Joi from 'joi';

const logInValidation:any = Joi.object({

  name: Joi.string().required(),
  password: Joi.string().alphanum().min(6).required(),
});

export default logInValidation;

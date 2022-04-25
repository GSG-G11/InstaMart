import { Request } from 'express';
import Joi from 'joi';

const addProductValidation = (req: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required(),
    details: Joi.string().required(),
    categoryId: Joi.string().required(),
  });
  return schema.validateAsync(req.body);
};

export default addProductValidation;

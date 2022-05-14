import { Request } from 'express';
import Joi from 'joi';

const editOrderValidation = (req:Request) => {
  const schema = Joi.object({
    status: Joi.string().required(),
    id: Joi.number().required(),
  });
  return schema.validateAsync(req.body);
};

export default editOrderValidation;

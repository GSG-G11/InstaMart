import { Request } from 'express';
import Joi from 'joi';

const orderValidation = (req: Request) => {
  const schema = Joi.object({
    productArray: Joi.string().required(),
    date: Joi.date().raw().required(),
    paidPrice: Joi.number().required(),

  });

  return schema.validateAsync(req.body);
};

export default orderValidation;

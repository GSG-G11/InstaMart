import { Request } from 'express';
import Joi from 'joi';

const orderValidation = (req: Request) => {
  const schema = Joi.object({
    productArray: Joi.array()
      .items({
        id: Joi.number()
          .required(),
        quantity: Joi.number()
          .required(),
      }),
    isSupplied: Joi.boolean().required(),
    date: Joi.date().raw().required(),
    paidPrice: Joi.number().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required(),
  });

  return schema.validateAsync(req.body);
};

export default orderValidation;

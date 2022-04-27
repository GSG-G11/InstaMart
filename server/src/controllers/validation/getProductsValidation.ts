import { Request } from 'express';
import Joi from 'joi';

const getProductsSchema = Joi.object({
  q: Joi.string().allow(''), // allow empty string which is not a string in joi
  categoryId: Joi.number().allow(''),
  sort: Joi.string().pattern(/^(DESC|ASC)$/i).allow(''),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),

});

const getProductsValidation = (req:Request) => getProductsSchema.validateAsync(req.query);
export default getProductsValidation;

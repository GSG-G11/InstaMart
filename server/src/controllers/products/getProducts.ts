import { NextFunction, Request, Response } from 'express';
import { getProductsValidation } from '../validation';
import { Product } from '../../database';

const getProducts = async (req:Request, res:Response, next:NextFunction) => {
  const { q, categoryId, sort } = req.query;
  try {
    await getProductsValidation(req);
    const dbProducts = await Product.findAll({
      where: categoryId ? { categoryId: +categoryId } : undefined,
      order: sort ? [['price', `${sort}`]] : undefined,
    });
    res.json(dbProducts.filter(({ name }) => !q || name.includes(`${q}`)));
  } catch (err:any) {
    if (err.details) {
      res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    next(err);
  }
};

export default getProducts;

import { NextFunction, Request, Response } from 'express';
import { Product } from '../../database';

const getCategoryProduct = async (req:Request, res:Response, next:NextFunction) => {
  const { categoryID } = req.params;
  try {
    const categoryProducts = await Product.findAll({ where: { categoryId: categoryID } });
    return res.json({ success: true, data: categoryProducts });
  } catch (err : any) {
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};

export default getCategoryProduct;

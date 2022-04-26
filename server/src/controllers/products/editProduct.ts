import { Request, Response, NextFunction } from 'express';
// import { CustomizedError } from '../../utilities';
import { editProductValidation } from '../validation';
import { Product } from '../../database';

const editProduct = async (req:Request, res:Response, next:NextFunction) => {
  const {
    id, name, imageUrl, price, details, categoryId,
  } = req.body;
  try {
    await editProductValidation(req.body);
    await Product.upsert({
      id, name, imageUrl, price, details, categoryId,
    });
    res.status(200).json({ message: 'Product Updated Successfully !' });
  } catch (err:any) {
    if (err.details) {
      res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    next(err);
  }
};

export default editProduct;

import { Request, Response, NextFunction } from 'express';
import { Product } from '../../database';
import { CustomizedError } from '../../utilities';
import addProductValidation from '../validation/addProductValidation';

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, imageUrl, price, details, categoryId,
  } = req.body;
  try {
    await addProductValidation(req);
    await Product.create({
      name, imageUrl, price, details, categoryId,
    });
    res.status(200).json({ message: 'Product Added Successfully !' });
  } catch (error: any) {
    if (error.details) {
      res.status(422).json(error.details[0].message);
    } else {
      next(CustomizedError('server error', 500));
    }
  }
};

export default addProduct;

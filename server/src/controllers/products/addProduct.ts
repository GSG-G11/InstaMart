import { Request, Response, NextFunction } from 'express';
import { Product, ProductOrder } from '../../database';
import { CustomizedError, receiveImage } from '../../utilities';
import addProductValidation from '../validation/addProductValidation';

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, price, details, categoryId, quantity,
  } = req.body;
  let { imageUrl } = req.body;
  try {
    await addProductValidation(req);
    imageUrl = await receiveImage(imageUrl);
    const newProduct = await Product.create({
      name, imageUrl, price, details, categoryId,
    });
    const productId = newProduct.id;
    await ProductOrder.create({
      quantity, productId,
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

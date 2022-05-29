import { Request, Response, NextFunction } from 'express';
import { CustomizedError } from '../../utilities';
import { Product } from '../../database';

const deleteProduct = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: { id },
    });
    res.status(200).json({ message: 'Product Deleted Successfully !' });
  } catch (error:any) {
    if (error.details) {
      res.status(422).json(error.details[0].message);
    } else {
      next(CustomizedError('server error', 500));
    }
  }
};

export default deleteProduct;

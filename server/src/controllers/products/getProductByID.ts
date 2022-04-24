import { NextFunction, Request, Response } from 'express';
import { Product } from '../../database';

const getProductByID = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;
  try {
    const productByID = await Product.findOne({ where: { id } });
    if (productByID) {
      res.json({ success: true, data: productByID });
    } else {
      res.status(404).json({ success: false, message: 'No product found!' });
    }
  } catch (err: any) {
    if (err.details) {
      res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    next(err);
  }
};
export default getProductByID;

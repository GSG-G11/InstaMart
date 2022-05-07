import { Request, Response, NextFunction } from 'express';
import { Order } from '../../database';
// import { CustomizedError } from '../../utilities';
import { orderValidation } from '../validation';

const addOrder = async (req:Request, res:Response, next:NextFunction) => {
  const {
    date, paidPrice, productArray,
  } = req.body;
  const totalPrice = productArray.reduce((sum:number, cur:any) => sum + +cur.price
  * cur.quantity, 0);

  try {
    await orderValidation(req);
    await Order.create({
      date, totalPrice, paidPrice, status: 'pending', supplier: 'admin', isSupplied: false,
    });
    return res.status(200).json({ message: 'Order Added Successfully !' });
  } catch (err:any) {
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};

export default addOrder;

import { Request, Response, NextFunction } from 'express';
import { CustomizedError } from '../../utilities';
import { Order } from '../../database';
import { editOrderValidation } from '../validation';

const editOrder = async (req:Request, res:Response, next:NextFunction) => {
  const { status, id } = req.body;
  try {
    await editOrderValidation(req);
    const toBeEditOrder = await Order.findOne({ where: id });
    if (toBeEditOrder) {
      toBeEditOrder.status = status;
      await toBeEditOrder?.save();
      res.status(200).json({ message: 'Order Updated Successfully !' });
    } else {
      next(CustomizedError('Bad Request', 400));
    }
  } catch (error:any) {
    if (error.details) {
      res.status(422).json(error.details[0].message);
    } else {
      next(CustomizedError('server error', 500));
    }
  }
};

export default editOrder;

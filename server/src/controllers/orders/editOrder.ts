import { Request, Response, NextFunction } from 'express';
import { CustomizedError } from '../../utilities';
import { Order } from '../../database';
import { editOrderValidation } from '../validation';

const editOrder = async (req:Request, res:Response, next:NextFunction) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    await editOrderValidation(req);
    const result = await Order.findOne({ where: { id } });
    if (result) {
      result.status = status;
      await result.save();
      res.status(200).json({ message: 'Order Updated Successfully !', data: result });
    } else {
      res.status(400).json({ success: false, message: 'Bad Request!' });
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

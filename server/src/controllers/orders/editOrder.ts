import { Request, Response, NextFunction } from 'express';
import { CustomizedError } from '../../utilities';
import { Order } from '../../database';
import { editOrderValidation } from '../validation';
import twilio from '../../utilities/twilio';

const editOrder = async (req:Request, res:Response, next:NextFunction) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    await editOrderValidation(req);
    const result = await Order.findOne({ where: { id } });
    if (result) {
      result.status = status;
      await result.save();
      const SMSMessageText = (statusOrder: string) => {
        let message = '';
        if (statusOrder === 'approved') {
          message = 'Hi,Your order was successfully delivered ';
        } else {
          message = 'Hi,Your order was rejected , you can try again later.';
        }
        return message;
      };
      const SMSmessage = await twilio(
        result.mobile,
        SMSMessageText(result.status),
      );
      res.status(200).json({ message: 'Order Updated Successfully !', data: result, SMSmessage });
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

import { Request, NextFunction, Response } from 'express';
import { Order, Product } from '../../database';

const getOrders = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll(
      {
        include: [Product],
      },
    );
    return res.json({
      status: 200,
      data: orders,
    });
  } catch (error:any) {
    return next(error);
  }
};
export default getOrders;

import { Request, Response, NextFunction } from 'express';
import {
  fn,
  literal, Op, col,
} from 'sequelize';
import { Order, ProductOrder, Product } from '../../database';
import { orderValidation } from '../validation';

const addOrder = async (req:Request, res:Response, next:NextFunction) => {
  const {
    date, paidPrice, productArray, isSupplied = false,
  } = req.body;
  // const totalPrice = productArray.reduce((sum:number, cur:any) => sum + +cur.price
  // * cur.quantity, 0);

  try {
    await orderValidation(req);
    const order = await Order.create({
      date, totalPrice: 0, paidPrice, status: 'pending', isSupplied,
    });
    const productOrders = await ProductOrder.bulkCreate(productArray.map(({ id, quantity }:
      {id:number, quantity:number}) => ({
      productId: id,
      orderId: order.id,
      quantity,

    })));

    const totalPrice = await ProductOrder.findAll({
      where: { orderId: order.id },
      include: [{
        model: Product,
        required: true,
        duplicating: false,
        attributes: [

        ],
      }],
      attributes: [

        [literal('SUM(product.price*quantity)'), 'total'],
      ],
      group: ['productOrder.orderId'],
    });
    return res.json(totalPrice);

    return res.status(200).json({ message: 'Order Added Successfully !' });
  } catch (err:any) {
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};

export default addOrder;

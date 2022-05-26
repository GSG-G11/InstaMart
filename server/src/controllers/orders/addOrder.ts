import { Request, Response, NextFunction } from 'express';
import {
  literal,
} from 'sequelize';
import sequelize, { Order, ProductOrder, Product } from '../../database';
import { orderValidation } from '../validation';
import { CustomizedError } from '../../utilities';

interface User {
  id: number,
  isAdmin: boolean,
  name: string,
  iat?: number
}
interface ModRequest extends Request{
  user?:User
  }
const addOrder = async (req:ModRequest, res:Response, next:NextFunction) => {
  const {
    date, paidPrice, productArray, isSupplied = false, mobile, address,
  } = req.body;

  const isAdmin = req.user?.isAdmin || false;
  const userId = req.user?.id;
  if (isSupplied && !isAdmin) return next(CustomizedError('Bad Request', 400));
  const t = await sequelize.transaction();
  try {
    await orderValidation(req);
    const order = await Order.create({
      date, totalPrice: Infinity, paidPrice, status: 'pending', isSupplied, mobile, address, userId,
    }, { transaction: t });
    await ProductOrder.bulkCreate(productArray.map(({ id, quantity }:
      {id:number, quantity:number}) => ({
      productId: id,
      orderId: order.id,
      quantity: isSupplied ? quantity : -quantity,
    })), { transaction: t });

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

        [literal('SUM(product.price*quantity)'), 'orderId'],
      ],
      group: ['productOrder.orderId'],
      transaction: t,
    });
    order.totalPrice = -Number(totalPrice[0]?.orderId || 0);
    await order.save({ transaction: t });
    await t.commit();

    const io = req.app.get('socketio');
    io.emit('notification', { message: 'You Received an Order Check it Out' });

    return res.status(200).json({ success: true, message: 'Order added successfully!' });
  } catch (err:any) {
    await t.rollback();
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};

export default addOrder;

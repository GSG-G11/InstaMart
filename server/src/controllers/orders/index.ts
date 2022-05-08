import { Request, Response, NextFunction } from 'express';
import {
  transaction,
  literal,
} from 'sequelize';
import { Order, ProductOrder, Product } from '../../database';
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
    date, paidPrice, productArray, isSupplied = false,
  } = req.body;

  const isAdmin = req.user?.isAdmin || false;
  if (isSupplied && !isAdmin) return next(CustomizedError('Bad Request', 400));

  const t = await transaction();

  try {
    await orderValidation(req);
    const order = await Order.create({
      date, totalPrice: Infinity, paidPrice, status: 'pending', isSupplied,
    }, { transaction: t });
    await ProductOrder.bulkCreate(productArray.map(({ id, quantity }:
      {id:number, quantity:number}) => ({
      productId: id,
      orderId: order.id,
      quantity: isSupplied ? -quantity : quantity,
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

        [literal('SUM(product.price*quantity)'), 'totalPrice'],
      ],
      group: ['productOrder.orderId'],
      transaction: t,
    });
    order.totalPrice = Number(totalPrice[0].totalPrice);
    await order.save({ transaction: t });

    return res.status(200).json({ message: 'Order Added Successfully !' });
  } catch (err:any) {
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};

export default addOrder;

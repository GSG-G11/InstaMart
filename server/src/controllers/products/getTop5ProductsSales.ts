import { Request, Response, NextFunction } from 'express';
import {
  fn, col,
} from 'sequelize';
import { ProductOrder, Product, Order } from '../../database';

const getTop5ProductsSales = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const top5Products = await ProductOrder.findAll({
      include: [{
        model: Product,
        attributes: [],
      }, {
        model: Order,
        attributes: [],
        where: { isSupplied: false },
      }],
      attributes: ['productId',
        [col('product.name'), 'productName'],
        [fn('sum', col('quantity')), 'quantity'],
      ],
      limit: 5,
      group: ['productId', 'product.name'],
      order: [[fn('sum', col('quantity')), 'ASC']],
    });
    return res.status(200).json(
      {
        status: 200,
        data: top5Products,
      },
    );
  } catch (err:any) {
    return next(err);
  }
};

export default getTop5ProductsSales;

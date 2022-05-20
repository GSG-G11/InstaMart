import { Request, Response, NextFunction } from 'express';
import {
  fn, col, literal,
} from 'sequelize';
import { Order, User } from '../../database';

const getUsersBalances = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const usersBalances = await Order.findAll({
      include: {
        model: User,
        attributes: [],
      },
      attributes: ['userId',
        [col('user.name'), 'userName'],
        [fn('sum', col('totalPrice')), 'totalPrice'],
        [fn('sum', col('paidPrice')), 'paidPrice'],
        [literal('SUM("totalPrice"-"paidPrice")'), 'balance'],
      ],
      group: ['user.id', 'userId'],
    });

    return res.status(200).json(
      {
        status: 200,
        data: usersBalances,
      },
    );
  } catch (err:any) {
    return next(err);
  }
};

export default getUsersBalances;

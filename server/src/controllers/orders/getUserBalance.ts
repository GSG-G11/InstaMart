import { Request, Response, NextFunction } from 'express';
import {
  fn, col, literal, Op,
} from 'sequelize';
import { Order, User } from '../../database';

interface UserI {
    id: number,
    isAdmin: boolean,
    name: string,
    iat?: number
}

interface ModRequest extends Request{
user?:UserI
}
const getUserBalance = async (req:ModRequest, res:Response, next:NextFunction) => {
  const userId = req?.user?.id;

  try {
    const usersBalances = await Order.findAll({
      where: { [Op.and]: [{ status: 'Approved' }, { userId }] },
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

export default getUserBalance;

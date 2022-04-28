import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { getProductsValidation } from '../validation';
import { Category, Product } from '../../database';

const getProducts = async (req:Request, res:Response, next:NextFunction) => {
  const {
    q, categoryId, sort, page = 1, limit = 6,
  } = req.query;
  try {
    await getProductsValidation(req);

    const dbFilterdProducts = await Promise.all([Product.findAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      include: { model: Category, attributes: ['id', 'name', 'imageUrl'] },
      attributes: ['id', 'name', 'imageUrl', 'details', 'categoryId'],
      where:
       ((categoryId && q) ? {
         [Op.and]: [{ categoryId: +categoryId }, { name: { [Op.iLike]: `%${q}%` } }],
       } : undefined)
       || (categoryId ? { categoryId: +categoryId } : undefined)
       || (q ? { name: { [Op.iLike]: `%${q}%` } } : undefined),
      order: sort ? [['price', `${sort}`]] : undefined,
    }),
    Product.count({
      where:
       ((categoryId && q) ? {
         [Op.and]: [{ categoryId: +categoryId }, { name: { [Op.iLike]: `%${q}%` } }],
       } : undefined)
       || (categoryId ? { categoryId: +categoryId } : undefined)
       || (q ? { name: { [Op.iLike]: `%${q}%` } } : undefined),
    }),
    ]);

    return res.json({
      status: 200,
      totalPages: Math.ceil(dbFilterdProducts[1] / +limit) || 1,
      data: dbFilterdProducts[0],
    });
  } catch (err:any) {
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};

export default getProducts;

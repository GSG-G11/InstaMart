import { NextFunction, Request, Response } from 'express';
import { Op, fn, col } from 'sequelize';
import { getProductsValidation } from '../validation';
import { Category, Product, ProductOrder } from '../../database';

const getProducts = async (req:Request, res:Response, next:NextFunction) => {
  const {
    q, categoryId, sort, page = 1, limit,
  } = req.query;
  try {
    await getProductsValidation(req);

    const dbFilterdProducts = await Promise.all([Product.findAll({
      offset: limit ? ((+page - 1) * +limit) : undefined,
      limit: limit ? +limit : undefined,
      include: [{ model: Category, attributes: ['id', 'name', 'imageUrl'] }, {
        model: ProductOrder, attributes: [], required: true, duplicating: false,
      }],
      attributes: ['id', 'name', 'imageUrl', 'details', 'categoryId', 'price', [fn('sum', col('productOrders.quantity')), 'availableQuantity'], 'createdAt'],
      group: ['product.id', 'category.id'],
      where:
       ((categoryId && q) ? {
         [Op.and]: [{ categoryId: +categoryId }, { name: { [Op.iLike]: `%${q}%` } }],
       } : undefined)
       || (categoryId ? { categoryId: +categoryId } : undefined)
       || (q ? { name: { [Op.iLike]: `%${q}%` } } : undefined),
      order: sort ? [['price', `${sort}`]] : [['id', 'ASC']],
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
      totalPages: limit ? (Math.ceil(dbFilterdProducts[1] / (+limit) || 1)) : 1,
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

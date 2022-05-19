import { NextFunction, Request, Response } from 'express';
import { fn, col } from 'sequelize';
import { Product, Category, ProductOrder } from '../../database';

const getProductByID = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;
  try {
    const productByID = await Product.findOne({
      group: ['product.id', 'category.id'],
      include: [{ model: Category }, {
        model: ProductOrder, attributes: [], required: true, duplicating: false,
      }],
      where: { id },
      attributes: ['id', 'name', 'price', 'imageUrl', 'details', 'categoryId', 'createdAt', 'updatedAt', [fn('sum', col('productOrders.quantity')), 'availableQuantity']],
    });
    if (productByID) {
      return res.json({ success: true, data: productByID });
    }
    return res.status(404).json({ success: false, message: 'No product found!' });
  } catch (err: any) {
    if (err.details) {
      return res.status(422).json({ msg: err.details[0].message, status: 422 });
    }
    return next(err);
  }
};
export default getProductByID;

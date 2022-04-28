import { NextFunction, Request, Response } from 'express';
import { Category } from '../../database';

const getCategories = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const dbCategories = await Category.findAll({
      attributes: ['id', 'name', 'imageUrl'],
    });
    return res.json({
      status: 200,
      data: dbCategories,
    });
  } catch (err:any) {
    return next(err);
  }
};

export default getCategories;

import { Request, Response, NextFunction } from 'express';

const serverError = (err:Error, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json(err);
};

export default serverError;

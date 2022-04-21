import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
const serverError = (err:Error, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json(err);
};

export default serverError;

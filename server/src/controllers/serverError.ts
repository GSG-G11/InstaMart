import { Request, Response, NextFunction } from 'express';

interface ModError extends Error {
  status?: number;
}
// eslint-disable-next-line no-unused-vars
const serverError = (err:ModError, req:Request, res:Response, next:NextFunction) => {
  console.log(err);
  res.status(err.status || 500).json({ status: (err.status || 500), msg: err.message });
};

export default serverError;

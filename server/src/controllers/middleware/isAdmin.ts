import { Request, Response, NextFunction } from 'express';
import { CustomizedError } from '../../utilities';

interface User {
        id: number,
        isAdmin: boolean,
        name: string,
        iat?: number
}

interface ModRequest extends Request{
user?:User
}

const isAdmin = async (req:ModRequest, res:Response, next:NextFunction) => {
  if (req.user?.isAdmin) {
    return next();
  }
  return next(CustomizedError('Forbidden ', 403));
};

export default isAdmin;

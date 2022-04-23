import { Request, Response, NextFunction } from 'express';
import { jwtVerify, CustomizedError } from '../../utilities';

interface ModRequest extends Request{
user?:unknown
}
const isAuth = async (req:ModRequest, res:Response, next:NextFunction) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const decodedToken = await jwtVerify(token);
      req.user = decodedToken;
      return next();
    }
    return next(CustomizedError('Unauthorized', 401));
  } catch (err:any) {
    res.clearCookie('token');
    return next(CustomizedError('Bad Request', 400));
  }
};

export default isAuth;

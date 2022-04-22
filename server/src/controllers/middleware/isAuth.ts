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
    throw CustomizedError('Unauthorized', 401);
  } catch (err:any) {
    return res.clearCookie('token').json(CustomizedError('Bad request', 400));
  }
};

export default isAuth;

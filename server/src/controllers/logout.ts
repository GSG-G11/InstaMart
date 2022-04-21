import { Request, Response } from 'express';

const logout = (req:Request, res:Response) => {
  res.clearCookie('token').clearCookie('token').json({ redirect: '/' });
};

export default logout;

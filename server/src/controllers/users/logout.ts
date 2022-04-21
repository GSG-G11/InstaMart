import { Request, Response } from 'express';

const logout = (req:Request, res:Response) => {
  res.clearCookie('token').json({ status: 200, msg: 'logged out successfully !' });
};

export default logout;

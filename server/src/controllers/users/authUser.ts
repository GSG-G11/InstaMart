import { Request, Response } from 'express';

interface ModRequest extends Request{
    user?:unknown
    }

const authUser = (req:ModRequest, res:Response) => {
  res.json(req.user);
};

export default authUser;

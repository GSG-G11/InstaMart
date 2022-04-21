import { Request, Response } from 'express';

const notFound = (req:Request, res:Response) => {
  res.status(404).json({ status: 404, msg: 'Not Found' });
};

export default notFound;

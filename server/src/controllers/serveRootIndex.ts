import { join } from 'path';
import { Request, Response } from 'express';

const serveRoot = (req:Request, res:Response) => {
  res.sendFile(join(__dirname, '..', '..', '..', 'client', 'build', 'index.html'));
};

export default serveRoot;

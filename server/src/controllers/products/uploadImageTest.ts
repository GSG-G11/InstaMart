import { Request, Response } from 'express';
import reseveImage from '../../utilities/reseveImage';

const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    const publicID = await reseveImage(image);
    res.json({ success: true, data: publicID });
  } catch (error) {
    res.json({ success: false, Message: error });
  }
};

export default uploadImage;

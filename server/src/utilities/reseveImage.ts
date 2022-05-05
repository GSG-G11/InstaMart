import cloudinary from './cloundinary';

const reseveImage = async (image: string) => {
  const uploadResponse = await cloudinary.uploader.upload(image);
  const { public_id: publicID } = uploadResponse;
  return publicID;
};

export default reseveImage;

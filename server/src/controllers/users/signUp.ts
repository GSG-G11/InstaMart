import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { signupValidation } from '../validation';
import { User } from '../../database/models';
import { jwtSign, CustomizedError } from '../../utilities';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, address, mobile, email, password, confirmPassword,
  } = req.body;
  try {
    await signupValidation(req);
    const isEmailExist = await User.findOne({ where: { email } });
    if (isEmailExist) {
      res.status(400).json({ success: false, message: 'Email is already exist !' });
    } else if (confirmPassword === password) {
      const encryptedPass = await bcrypt.hash(password, 10);
      const user = await User.create({
        name, address, mobile, email, password: encryptedPass, isAdmin: false,
      });
      const token = await jwtSign({ id: user.id, isAdmin: user.isAdmin, name });
      res.cookie('token', token).status(201).json({ success: true, user: { isAdmin: user.isAdmin, id: user.id, name } });
    } else {
      res.status(400).json({ success: false, message: 'password and checkPassword not equivelant' });
    }
  } catch (error: any) {
    console.log(error);
    if (error.details) {
      res.status(422).json(error.details[0].message);
    } else {
      next(CustomizedError('server error', 500));
    }
  }
};
export default signUp;

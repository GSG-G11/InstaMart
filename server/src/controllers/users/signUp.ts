import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import signupValidation from '../validation';
import { User } from '../../database/models';
import { jwtSign } from '../../utilities';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    signupValidation(req.body).then(async () => {
      const { email, password, confirmPassword } = req.body;
      const isEmailExist = await User.findOne({ where: { email } });
      if (isEmailExist) {
        res.status(400).json({ success: false, message: 'Email is already exist !' });
      } else if (confirmPassword === password) {
        bcrypt.hash(password, 10).then(async (encryptedPass) => {
          // eslint-disable-next-line max-len
          const user = await User.create({ ...req.body, password: encryptedPass });
          jwtSign({ id: user.id, isAdmin: user.is_admin })
            .then((token) => {
              res.cookie('token', token)
                .status(201)
                .json({ success: true });
            });
        }).catch(() => {
          next('Internal Server Error');
        });
      } else {
        res.status(400).json({ success: false, message: 'check the password' });
      }
    }).catch((error: Error) => {
      res.send({ success: false, error: error.message });
    });
  } catch {
    next('Internal Server Error');
  }
};

export default signUp;

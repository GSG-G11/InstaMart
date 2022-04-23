import { Request, Response } from 'express';
import { logInValidation } from '../validation';
import { CustomizedError, comparePass, jwtSign } from '../../utilities';
import { User } from '../../database/models';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await logInValidation.validateAsync(req.body);
    const getUser = await User.findAll({
      where: {
        email,
      },
    });
    if (getUser.length === 0) {
      throw CustomizedError('Email Is Used Sign Up', 403);
    }

    const {
      password: hashedPass, id, isAdmin, name,
    } = getUser[0];
    const verifiedUser = await comparePass(password, hashedPass);

    if (!verifiedUser) throw CustomizedError('password Invalid', 403);
    else {
      const token = await jwtSign({ id, isAdmin, name });
      res.cookie('token', token);
      res.send({ msg: 'logIn successfully', user: { isAdmin, id, name } });
    }
  } catch (err: any) {
    if (err.details) {
      res.json(CustomizedError(err.details[0].message, 400));
    } else {
      res.json({ error: err.message });
    }
  }
};

export default login;

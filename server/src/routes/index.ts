import { Router } from 'express';
import {
  signUp, login, logout, notFound, serverError,
} from '../controllers';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.use(notFound);
router.use(serverError);

export default router;

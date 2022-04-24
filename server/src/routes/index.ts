import { Router } from 'express';
import {
  signUp, login, logout, notFound, serverError, authUser,
  addProduct, deleteProduct, editProduct, getProducts,
} from '../controllers';
import { isAuth } from '../controllers/middleware';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.route('/products')
  .get(getProducts)
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);

// Protected routes should be under this line
router.use('/auth', isAuth);
router.get('/auth/user', authUser);

router.use(notFound);
router.use(serverError);

export default router;

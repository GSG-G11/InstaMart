import { Router } from 'express';
import {
  signUp, login, logout, notFound, serverError, authUser,
  // eslint-disable-next-line no-unused-vars
  addProduct, deleteProduct, editProduct, getProducts,
} from '../controllers';
import { isAuth } from '../controllers/middleware';
import { getCategories } from '../controllers/products';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/products', getProducts);
router.get('/categories', getCategories);

// Protected routes should be under this line
router.use('/auth', isAuth);
router.get('/auth/user', authUser);
router.route('/auth/admin/product')
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);

router.use(notFound);
router.use(serverError);

export default router;

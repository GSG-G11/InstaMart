import { Router } from 'express';
import {
  signUp, login, logout, notFound, serverError, authUser,
  getProducts, getProductByID, addOrder,
} from '../controllers';
import { isAuth } from '../controllers/middleware';
import { getCategories, getCategoryProduct } from '../controllers/products';
import adminRouter from './adminRouter';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/products/:id', getProductByID);
router.get('/categories/:categoryID/products', getCategoryProduct);

// Protected routes should be under this line
router.use('/auth', isAuth);
router.get('/auth/user', authUser);
router.use('/admin', adminRouter);
router.post('/order', addOrder);
router.use(notFound);
router.use(serverError);

export default router;

import { Router } from 'express';
import {
  getUserBalance,
  addOrder,
  signUp,
  login,
  logout,
  notFound,
  serverError,
  authUser,
  getProducts,
  getProductByID,
  getCategories,
  getCategoryProduct,
  uploadImage,
  deleteOrder,
} from '../controllers';
import { isAuth } from '../controllers/middleware';
import adminRouter from './adminRouter';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/products/:id', getProductByID);
router.get('/categories/:categoryID/products', getCategoryProduct);
router.post('/product/upload', uploadImage);

// Protected routes should be under this line
router.get('/auth/user', isAuth, authUser);
router.use('/admin', isAuth, adminRouter);
router.post('/order', isAuth, addOrder);
router.delete('/order', isAuth, deleteOrder);
router.get('/balance', isAuth, getUserBalance);
router.use(notFound);
router.use(serverError);

export default router;

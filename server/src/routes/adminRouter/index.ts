import { Router } from 'express';
import {
  addProduct, deleteOrder, deleteProduct, editProduct, editOrder,
  getOrders, getUsersBalances, getTop5ProductsSales,
} from '../../controllers';
import { isAuth, isAdmin } from '../../controllers/middleware';

const adminRouter = Router();

adminRouter.use(isAuth);
adminRouter.use(isAdmin);
adminRouter.route('/product/:id')
  .delete(deleteProduct);
adminRouter.route('/product')
  .post(addProduct)
  .patch(editProduct);
adminRouter.route('/order/:id')
  .patch(editOrder)
  .delete(deleteOrder);

adminRouter.route('/order')
  .get(getOrders);
adminRouter.get('/balances', getUsersBalances);
adminRouter.get('/top5', getTop5ProductsSales);

export default adminRouter;

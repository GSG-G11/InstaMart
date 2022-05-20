import { Router } from 'express';
import {
  addProduct, deleteOrder, deleteProduct, editProduct, editOrder, getOrders, getUsersBalances,
} from '../../controllers';
import { isAuth, isAdmin } from '../../controllers/middleware';

const adminRouter = Router();

adminRouter.use(isAuth);
adminRouter.use(isAdmin);
adminRouter.route('/product')
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);
adminRouter.route('/order/:id')
  .patch(editOrder)
  .delete(deleteOrder);

adminRouter.route('/order')
  .get(getOrders);
adminRouter.get('/balances', getUsersBalances);

export default adminRouter;

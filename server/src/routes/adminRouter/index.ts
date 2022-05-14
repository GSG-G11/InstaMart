import { Router } from 'express';
import {
  addProduct, deleteOrder, deleteProduct, editProduct, editOrder, getOrders,
} from '../../controllers';
import { isAuth, isAdmin } from '../../controllers/middleware';

const adminRouter = Router();

adminRouter.use(isAuth);
adminRouter.use(isAdmin);
adminRouter.route('/product')
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);
adminRouter.patch('/order/:id', editOrder);

adminRouter.route('/order')
  .get(getOrders)
  .delete(deleteOrder);
export default adminRouter;

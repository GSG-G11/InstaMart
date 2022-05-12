import { Router } from 'express';
import {
  addProduct, deleteOrder, deleteProduct, editProduct, editOrder,
} from '../../controllers';
import { isAuth, isAdmin } from '../../controllers/middleware';

const adminRouter = Router();

adminRouter.use(isAuth);
adminRouter.use(isAdmin);
adminRouter.route('/product')
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);
adminRouter.patch('/order', editOrder);

adminRouter.route('/order')
  .delete(deleteOrder);
export default adminRouter;

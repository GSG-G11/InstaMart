import { Router } from 'express';
import {
  addProduct, deleteOrder, deleteProduct, editProduct,
} from '../../controllers';
import { isAuth, isAdmin } from '../../controllers/middleware';

const adminRouter = Router();

adminRouter.use(isAuth);
adminRouter.use(isAdmin);
adminRouter.route('/product')
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);
adminRouter.route('/order')
  .delete(deleteOrder);
export default adminRouter;

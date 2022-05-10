import { Router } from 'express';
import { addProduct, deleteProduct, editProduct } from '../../controllers';
import { isAuth, isAdmin } from '../../controllers/middleware';
import editOrder from '../../controllers/orders/editOrder';

const adminRouter = Router();

adminRouter.use(isAuth);
adminRouter.use(isAdmin);
adminRouter.route('/product')
  .post(addProduct)
  .patch(editProduct)
  .delete(deleteProduct);
adminRouter.patch('/order', editOrder);

export default adminRouter;

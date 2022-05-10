import notFound from './notFound';
import serverError from './serverError';
import serveRoot from './serveRootIndex';
import {
  authUser, login, logout, signUp,
} from './users';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getCategories,
  getCategoryProduct,
  getProductByID,
  getProducts,
  uploadImage,
} from './products';
import addOrder from './orders';

export {
  addOrder,
  serveRoot,
  notFound,
  serverError,
  logout,
  login,
  signUp,
  authUser,
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getProductByID,
  uploadImage,
  getCategories,
  getCategoryProduct,
};

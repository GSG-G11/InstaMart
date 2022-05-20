import sequelize from './config/connection';
import {
  User, Order, Product, Category, ProductOrder,
} from './models';

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: ProductOrder });
Product.belongsToMany(Order, { through: ProductOrder });
Product.hasMany(ProductOrder);
ProductOrder.belongsTo(Product);
Order.hasMany(ProductOrder);
ProductOrder.belongsTo(Order);

Category.hasMany(Product);
Product.belongsTo(Category);

export {
  User, Order, Product, Category, ProductOrder,
};
export default sequelize;

import sequelize from './config/connection';
import {
  User, Order, Product, Category, ProductOrder,
} from './models';

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: 'product_order' });
Product.belongsToMany(Order, { through: 'product_order' });

Category.hasMany(Product);
Product.belongsTo(Category);

export {
  User, Order, Product, Category, ProductOrder,
};
export default sequelize;

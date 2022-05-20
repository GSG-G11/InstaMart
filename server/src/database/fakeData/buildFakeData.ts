import sequelize, {
  Category, Product, User, ProductOrder, Order,
} from '..';
import {
  categories, products, users, productsOrders, order,
} from './fakeData';

const { NODE_ENV } = process.env;

const buildFakeData = async () => {
  await sequelize.sync({ force: true });
  // const dbData =
  await Promise.all([
    Category.bulkCreate(categories),
    Product.bulkCreate(products),
    User.bulkCreate(users),
  ]);

  await Order.bulkCreate(order);
  await ProductOrder.bulkCreate(productsOrders);

  // dbData.forEach(console.log);
};
if (NODE_ENV !== 'test') {
  buildFakeData();
}

export default buildFakeData;

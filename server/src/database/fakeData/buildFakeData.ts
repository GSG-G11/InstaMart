import sequelize, {
  Category, Product, User, ProductOrder,
} from '..';
import {
  categories, products, users, productsOrders,
} from './fakeData';

const { NODE_ENV } = process.env;

const buildFakeData = async () => {
  await sequelize.sync({ force: true });
  const dbData = await Promise.all([
    Category.bulkCreate(categories),
    Product.bulkCreate(products),
    ProductOrder.bulkCreate(productsOrders),
    User.bulkCreate(users),
  ]);
  dbData.forEach(console.log);
};

if (NODE_ENV !== 'test') {
  buildFakeData();
}

export default buildFakeData;

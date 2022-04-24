import sequelize, { Category, Product } from '..';
import { categories, products } from './fakeData';

const { NODE_ENV } = process.env;

const buildFakeData = async () => {
  await sequelize.sync({ force: true });
  const dbData = await Promise.all([
    Category.bulkCreate(categories),
    Product.bulkCreate(products),
  ]);
  dbData.forEach(console.log);
};

if (NODE_ENV !== 'test') {
  buildFakeData();
}

export default buildFakeData;

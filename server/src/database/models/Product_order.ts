import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

// eslint-disable-next-line camelcase
const Product_Order = sequelize.define('product_order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// eslint-disable-next-line camelcase
export default Product_Order;

import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
  },
//   quantity:{
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
});

export default Product;

import {
  DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import sequelize from '../config/connection';

interface ProductModel extends Model<InferAttributes<ProductModel>,
 InferCreationAttributes<ProductModel>> {
  id?:number,
  name:string,
  imageUrl:string,
  price: number,
  details?: string,
  categoryId?:number
 }

const Product = sequelize.define<ProductModel>('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
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
});

export default Product;

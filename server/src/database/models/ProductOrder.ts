import {
  DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import sequelize from '../config/connection';

interface ProductOrderModel extends Model<InferAttributes<ProductOrderModel>,
 InferCreationAttributes<ProductOrderModel>> {
  id?:number,
  quantity:number,
  productId?:number,
 }

const ProductOrder = sequelize.define<ProductOrderModel>('productOrder', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
});

export default ProductOrder;

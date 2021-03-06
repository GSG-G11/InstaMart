import {
  DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import Order from './Order';

interface ProductOrderModel extends Model<InferAttributes<ProductOrderModel>,
 InferCreationAttributes<ProductOrderModel>> {
  id?:number,
  quantity:number,
  productId?:number,
  orderId?:number,
  totalPrice?:number
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
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
  },
});

export default ProductOrder;

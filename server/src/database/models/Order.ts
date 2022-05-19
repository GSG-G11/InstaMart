import {
  DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import sequelize from '../config/connection';

interface OrderModel extends Model<InferAttributes<OrderModel>,
 InferCreationAttributes<OrderModel>> {
  id?:number,
  date:Date,
  totalPrice:number,
  paidPrice:number,
  status:string,
  supplier?:string,
  isSupplied:boolean,
  mobile:string,
  address:string,
 }

const Order = sequelize.define<OrderModel>('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  paidPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  supplier: {
    type: DataTypes.STRING,
  },
  isSupplied: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Order;

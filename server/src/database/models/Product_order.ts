import { DataTypes } from "sequelize";
import sequelize from "../config/connection";

const Product_Order = sequelize.define('product_order',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
      }
})

export default Product_Order
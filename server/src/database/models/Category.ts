import { DataTypes } from "sequelize";
import sequelize from "../config/connection";

const Category = sequelize.define('category',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      image_url:{
        type: DataTypes.TEXT,
        allowNull: false
      }
})

export default Category
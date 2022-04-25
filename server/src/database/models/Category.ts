import {
  DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import sequelize from '../config/connection';

interface CategoryModel extends Model<InferAttributes<CategoryModel>,
 InferCreationAttributes<CategoryModel>> {
  id?:number,
  name:string,
  imageUrl:string,
 }

const Category = sequelize.define<CategoryModel>('category', {
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
    allowNull: true,
  },
});

export default Category;

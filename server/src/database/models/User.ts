import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const User = sequelize.define('users', {
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
name:{
    type: DataTypes.STRING,
    allowNull: false
},
email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
},
mobile:{
    type: DataTypes.INTEGER,
},
address:{
    type: DataTypes.STRING,
},
password:{
    type: DataTypes.STRING,
    allowNull: false,
},
is_admin:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
},
});

export default User
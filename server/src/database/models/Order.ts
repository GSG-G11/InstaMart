import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Order = sequelize.define('orders', {
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
date:{
    type: DataTypes.DATE,
    allowNull: false
},
total_price:{
    type: DataTypes.DECIMAL,
    allowNull: false
},
paid_price:{
    type: DataTypes.DECIMAL,
    allowNull: false
},
status:{
    type: DataTypes.STRING,
    allowNull: false
},
supplier:{
    type: DataTypes.STRING,
},
is_admin:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
},
});

export default Order
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Admin = sequelize.define('admin', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.BOOLEAN,
        defautValue: false
    }
})
module.exports = Admin;
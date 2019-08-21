const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Shop = sequelize.define('shop', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
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
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    avatarUrl:{
        type: Sequelize.STRING,
        allowNull: true
    },
    status:{
        type: Sequelize.BOOLEAN,
        defautValue: false
    }
})
module.exports = Shop;
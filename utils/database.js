const Sequelize = require('sequelize');

const sequelize = new Sequelize('tools', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

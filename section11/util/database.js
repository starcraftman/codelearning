const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecomplete', 'bot', 'bottest', 
    {dialect: 'mysql', port: 3306, host: 'localhost'});

module.exports = sequelize;
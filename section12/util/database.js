const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecomplete', 'bot', 'bottest', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

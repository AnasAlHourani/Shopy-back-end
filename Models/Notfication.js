const Sequelize = require('sequelize');
const sequelize = require('../config/Sequelize');

const Notfication = sequelize.define('Notfication',{
    title:{
        type: Sequelize.STRING,
    },
    desc: Sequelize.TEXT,
});


module.exports = Notfication;
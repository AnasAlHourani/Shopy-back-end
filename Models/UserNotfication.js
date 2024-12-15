const Sequelize = require('sequelize');
const sequelize = require('../config/Sequelize');

const userNotfication = sequelize.define('user_notfication',{
    seen:{
        type: Sequelize.BOOLEAN,
        default: false,
    }
});

module.exports = userNotfication;
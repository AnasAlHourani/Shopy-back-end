const Sequelize = require('sequelize');
const sequelize = require('../config/Sequelize');

const Admin = sequelize.define('Admin',
    {
        active: {
            type: Sequelize.BOOLEAN,
            default: true,
        },
    }
);

module.exports = Admin;
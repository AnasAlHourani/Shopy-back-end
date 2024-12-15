const Sequelize = require('sequelize');
const sequelize = require('../config/Sequelize');


const product = sequelize.define('product',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    desc:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    imgUrl:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    price:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    qty:{
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = product;
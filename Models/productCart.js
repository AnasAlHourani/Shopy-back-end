const Sequelize = require('sequelize');
const sequelize = require('../config/Sequelize');

const productCart = sequelize.define('product_cart',{
    qty: {
        type: Sequelize.STRING,
    }
});

module.exports = productCart;
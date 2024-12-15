const Sequelize = require('sequelize');
const sequelize = require('../config/Sequelize');


const Cart = sequelize.define('Cart',{});

module.exports = Cart;
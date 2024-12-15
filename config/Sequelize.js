const Sequelize = require('sequelize');
const constants = require('../config/main').sequelize;

const sequelize = new Sequelize(constants.name,constants.userName,constants.password,{
    dialect: constants.dialect,
    host: constants.host,
    port: constants.port,
});


module.exports = sequelize;

// the models
const User = require('../Models/User');
const Admin = require('../Models/Admin');
    User.hasMany(Admin,{ foreignKey: 'user_id' });
    User.hasMany(Admin,{ foreignKey: 'admin_id' });
const Notfication = require('../Models/Norfication');
    Admin.hasMany(Notfication,{ foreignKey: 'admin_id' });
const userNotfication = require('../Models/UserNotfication');
    User.hasMany(userNotfication,{ foreignKey: 'user_id' });
    Notfication.hasMany(userNotfication,{ foreignKey: 'notfication_id' });
const product = require('../Models/Product');
    User.hasMany(product,{ foreignKey: 'user_id' });
const specialProduct = require('../Models/SpecialProduct');
    User.hasMany(specialProduct,{ foreignKey: 'user_id' });
const Cart = require('../Models/Cart'); 
    User.hasMany(Cart,{ foreignKey: 'user_id' });
const productCart = require('../Models/productCart');
    product.hasMany(productCart,{ foreignKey: 'product_id' });
    Cart.hasMany(productCart,{ foreignKey: 'cart_id' });
const Order = require('../Models/Order');
    User.hasMany(Order,{ foreignKey: 'user_id' });
    Cart.hasMany(Order,{ foreignKey: 'cart_id' });


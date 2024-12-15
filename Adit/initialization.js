const User = require('../Models/User');
const Admin = require('../Models/Admin');
const bcrypt = require('bcrypt');
const saltyHash = require('../config/main').bycrypt.saltyHash;


const mainAdmin = {
        'first_name': 'admin',
        'last_name': 'admin',
        'email':  'admin@shopy.com',
        'password': '12345678',
        'gender':'male',
        'birth_day': new Date().toString(),
        verified: true,
        img_url: null,
};

const  initAdmin =  (cb)=>{
    User.findAll({where:{email: mainAdmin.email , first_name: mainAdmin.first_name}})
    .then(users=>{
        if(!users.length){
            bcrypt.hash(mainAdmin.password,saltyHash)
            .then(hashedPassword=>{
                return User.create({
                    'first_name': mainAdmin.first_name,
                    'last_name': mainAdmin.last_name,
                    'email':  mainAdmin.email,
                    'password': hashedPassword,
                    'gender': mainAdmin.gender,
                    'birth_day': mainAdmin.gender,
                    verified: mainAdmin.verified,
                    img_url: mainAdmin.img_url,
                });
            })
            .then((user)=>{
                return Admin.create({
                    admin_id : user.id,
                    user_id : user.id,
                });
            }).then(_=>{
                cb();
            })
            .catch(err=>{
                console.log(err);
            });
        }else{
            cb();
        }
    })
    .catch(err=>{
        console.log(err);
    });
};

module.exports = initAdmin;
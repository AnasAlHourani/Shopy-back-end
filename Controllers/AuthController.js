const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const bycryptConstant = require('../config/main').bycrypt;
const User = require('../Models/User');
const Admin = require('../Models/Admin');
const jwtConstant = require('../config/main').jwt;


exports.signUp = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error();
        err.msg = errors.array()[0].msg;
        err.statusCode = 422;
        next(err,req,res,next);
    }
    const {first_name , last_name , email , gender , birth_day , password} = req.body;
    User.findAll({where: {email: email}})
    .then(users=>{
        if(users.length){
            const err = new Error();
            err.msg = 'this emial is already exist';
            err.statusCode = 421;
            next(err,req,res,next);
        }else{
            bcrypt.hash(password , bycryptConstant.saltyHash)
            .then((hashedPasswrod)=>{
                return User.create({
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'gender': gender,
                    'birth_day': birth_day,
                    'password': hashedPasswrod,
                });
            })
            .then( user =>{
                const token = jwt.sign({id : user.id, email: user.email},jwtConstant.secertKey,
                    {
                        expiresIn: jwtConstant.expiresIn, // Token valid for 1 hour
                        issuer: jwtConstant.issuer,
                    }
                );
                res.status(201).json({
                    msg: 'welcome ',
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    grender: user.grender,
                    birth_day: user.birth_day,
                    token: token,
                });
            })
            .catch(err=>{
                // console.log(err);
                next(err,req,res,next);
            });        
        }
    })
    .catch(err=>{
        next(err,req,res,next);
    });
};



exports.logIn = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error();
        err.msg = errors.array()[0].msg;
        err.statusCode = 422;
        next(err,req,res,next);
    }
    const { email , password } = req.body;
    User.findAll({where: {email: email}})
    .then(users=>{
        if(users.length){
            const user = users[0];
            bcrypt.compare(password,user.password)
            .then(match=>{
                if(match){
                    const token = jwt.sign({id : user.id, email: user.email},jwtConstant.secertKey,
                        {
                            expiresIn: jwtConstant.expiresIn, // Token valid for 1 hour
                            issuer: jwtConstant.issuer,
                        }
                    );
                    res.status(201).json({
                        msg: 'welcome back:',
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        grender: user.grender,
                        birth_day: user.birth_day,
                        token: token,
                    });
                }else{
                    res.status(422).json({msg: 'email or password no match !'});
                }
            })
            .catch(err=>{
                // console.log(err);
                next(err,req,res,next);
            });
        }else{
            res.status(422).json({msg: 'email or password no match'});
        }
    })
    .catch(err=>{
        // console.log(err);
        next(err,req,res,next);
    });
};



exports.auth = (req,res,next)=>{
    if(req.get('Authorization')){
        let token = req.get('Authorization');
        token = token.split(' ')[1];
        let decoded;
        try{
            decoded = jwt.verify(token,jwtConstant.secertKey);
        }catch(err){    
            const error = new Error();
            error.statusCode = 421;
            error.msg = 'NOT AUTHORIZED , PLEASE LOG IN AGIAN';
            next(error,req,res,next);
            return;
        }
        User.findAll({where: {id: decoded.id ,email: decoded.email}, })//where:{email: decoded.email}
        .then((users)=>{
            req.user = users[0];
            req.userId = users[0].id;
            next();
        })
        .catch(err=>{
            const error = new Error();
            error.statusCode = 421;
            error.msg = 'NOT AUTHORIZED , PLEASE LOG IN AGIAN';
            next(error,req,res,next);
        });
    }else{
        const error = new Error();
        error.statusCode = 421;
        error.msg = 'not authorization , pleas send a authorizition header';
        next(error,req,res,next);
    }
};


exports.isAdmin = (req,res,next)=>{
    const id = req.user.id;
    Admin.findAll({where: {user_id: id}})
    .then(admins=>{
        if(admins.length){
            next();
        }else{
            // res.status(403).json({msg:'ACCESS DENY'});
            const err = new Error();
            err.statusCode = 403;
            err.msg = 'access deny';
            throw err;
        }
    })
    .catch(err=>{
        next(err,req,res,next);
    });
};
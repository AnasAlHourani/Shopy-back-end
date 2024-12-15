const User = require('../Models/User');
const { validationResult } = require('express-validator');

exports.profile = (req,res,next)=>{
    res.json({
        msg:`It's ${req.user.first_name}'s profile`,
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        gender: req.user.gender,
        verified: req.user.verified,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
    });
};

exports.update = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg , filed: errors.array()[0].path});
    }
    User.findAll({where: {id: req.user.id,email:req.user.email}})
    .then(users=>{
            return users[0];
    })
    .then(user=>{
        const {first_name , last_name  } = req.body;
        user.first_name = first_name;
        user.last_name = last_name;
        user.save();
        res.status(201).json({msg: 'USER ACCOUNT UPDATED SUCCESSFULL: ',});
    }).catch(err=>{
        console.log(err);
        res.status(421).json({msg: 'SOMETHING WENT WRONG PLEASE TRY AGAIN LATER'});
    })
};


exports.uploadProfilePictuer = (req,res,next)=>{
    const img = req.file;
    if(!img){
        res.status(422).json({msg:'ATTECHED FIELE SHOULD BE AN IMAGE'});
    }else{
        User.findAll({where:{id: req.user.id}})
        .then(users=>{
            return users[0];
        }).then(user=>{
            user.img_url = '/' + img.path.slice(7,img.length);
            user.save();
            res.json({msg:'USER PICTUER SUCCESSFUL UPDATED'});
        }).catch(err=>{
            console.log(err);
        })
    }
};


exports.destry = (req,res,next)=>{
    User.findAll({where:{id: req.user.id}})
    .then(users=>{return users[0]})
    .then(user=>{ user.destroy(); res.json({msg: 'THE ACCOUNT HAS BEEN DELETED'})})
    .catch(err=>{console.log(err)});
};
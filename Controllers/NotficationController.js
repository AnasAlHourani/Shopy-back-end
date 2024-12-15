const {validationResult} = require('express-validator');
const Notfication = require('../Models/Notfication');

exports.create = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error();
        err.msg = errors.array()[0].msg;
        err.statusCode = 422;
        next(err,req,res,next);
    }
    const {title , desc  } = req.body;
    Notfication.create({
        'admin_id': req.user.id,
        'title': title,
        'desc': desc,
    }) 
    .then(_=>{
        res.status(201).json({
            msg:'THE NOTFICATION HAS BEEN CREATED',
        });
    }).catch(err=>{
        next(new Error(),req,res,next);
    });
};


exports.update = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error();
        err.msg = errors.array()[0].msg;
        err.statusCode = 422;
        next(err,req,res,next);
    }
    const { title,desc, not_id } = req.body;
    Notfication.findAll({where:{id: not_id}})
    .then(nots=>{
        if(!nots.length){
            res.status(404).json({msg:'NOT FOUND'});
        }else{
            const not = nots[0];
            not.title = title;
            not.desc = desc;
            not.save().then(_=>{
                res.json({msg:'UPDATED DONE SUCCESSFUL'});
            }).catch(err=>{
                console.log(err);
            })
        }
    }).catch(err=>{
        next(new Error(),req,res,next);
    });
};


exports.delete = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error();
        err.msg = errors.array()[0].msg;
        err.statusCode = 422;
        next(err,req,res,next);
    }
    Notfication.findAll({where:{id: req.params.id}})
    .then(nots=>{
        if(nots.length){
            nots[0].destroy();
            res.status(200).json({msg:'DELETED SUCCESSFULLY'});
        }
    }).catch(err=>{
        next(new Error(),req,res,next);
    })
};


exports.get = (req,res,next)=>{
    Notfication.findAll()
    .then(nots=>{
        res.json({
            msg:'ALL NOTFICATIONS:',
            notfications: nots
        })
    }).catch(err=>{
        next(new Error(),req,res,next);
    });
};
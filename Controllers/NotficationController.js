const {validationResult} = require('express-validator');
const Notfication = require('../Models/Notfication');

exports.create = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg , filed: errors.array()[0].path});
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
        console.log(err);
    });
};


exports.update = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg , filed: errors.array()[0].path});
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
        console.log(err);
    });
};


exports.delete = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg , filed: errors.array()[0].path});
    }
    Notfication.findAll({where:{id: req.params.id}})
    .then(nots=>{
        if(nots.length){
            nots[0].destroy();
            res.status(200).json({msg:'DELETED SUCCESSFULLY'});
        }
    }).catch(err=>{
        console.log(err);
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
        console.log(err);
    });
};
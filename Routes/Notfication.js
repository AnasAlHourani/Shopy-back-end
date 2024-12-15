const express = require('express');
const routes = express.Router();
const { param ,  body } = require('express-validator');
const notficationController = require('../Controllers/NotficationController');

routes.post('/create',
    [
        body('title','TITLE IS REQUIRED FILED AND AT LEAST 4 CHARS')
        .isLength({min:3})
        .isString(),
        body('desc','DESC IS REQUIRED FILED AND AT LEAST 4 CHARS')
        .isLength({min:3})
        .isString(),
    ]
    ,notficationController.create);


routes.put('/update',
    [
        body('not_id','HAS TO BE INTEGER')
        .isInt(),
        body('title','TITLE IS REQUIRED FILED AND AT LEAST 4 CHARS')
        .isLength({min:3})
        .isString(),
        body('desc','DESC IS REQUIRED FILED AND AT LEAST 4 CHARS')
        .isLength({min:3})
        .isString(),
    ]
    ,notficationController.update);


routes.delete('/delete/:id',
    [
        param('id','HAS TO BE INTEGER')
        .isNumeric()
        .isInt(),
    ],notficationController.delete);
    
routes.get('/get',notficationController.get);


module.exports = routes;


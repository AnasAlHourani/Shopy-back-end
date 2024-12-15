const express = require('express');
const routes = express.Router();
const userController = require('../Controllers/UserController');
const { body } = require('express-validator'); 
const User = require('../Models/User');
routes.get('/profile',userController.profile);

routes.put('/update',[
    body('first_name','first_name filed has to be between 4 to 255 chars')
    .isLength({min:4 , max: 255}),
    body('last_name','last_name filed has to be  between 4 to 255 chars')
    .isLength({min:4 , max: 255}),
    ],userController.update);

routes.delete('/destroy',userController.destry);

routes.put('/upload-profile-pictuer',userController.uploadProfilePictuer);


module.exports = routes;
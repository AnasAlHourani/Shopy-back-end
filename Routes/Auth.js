const express = require('express');
const routes = express.Router();

const { body } = require('express-validator');


const authController = require('../Controllers/AuthController');


routes.post('/sign-up',
    [
        body('first_name','first_name filed has to be between 4 to 255 chars')
        .isLength({min:4 , max: 255}),
        body('last_name','last_name filed has to be  between 4 to 255 chars')
        .isLength({min:4 , max: 255}),
        body('email','email filed has to be email and at least 5 chars and less than 255 chars')
        .isEmail(),
        body('password','password filed has to be nimuric and at least 8 chars and less than 255 chars')
        .isLength({min: 8 , max: 255})
        .isNumeric(),
        body('gender','gender filed has to be male or female')
        .isIn(['male', 'female']),
        body('birth_day','birth_day is required')
        // .isDate()
        // .custom(value => {
        //         // const birthDate = moment(value);
        //         // const age = moment().diff(birthDate, 'years');
        //         // if (age < 8) {
        //         //     return true;
        //         //     // throw new Error('User must be at least 8 years old');
        //         // }
        //         // return true; // Indicates the value is valid
        //         return true;
        //     }),
    ]
    ,authController.signUp);

routes.post('/log-in',
    [
        body('email','email filed has to be email and at least 5 chars and less than 255 chars')
        .isEmail(),
        body('password','password filed has to be nimuric and at least 8 chars and less than 255 chars')
        .isLength({min: 8 , max: 255})
        .isNumeric(),
    ],
    authController.logIn
);



module.exports = routes;
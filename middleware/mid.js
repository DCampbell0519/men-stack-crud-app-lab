require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

/*  
Custom Middleware: Takes advantage of the next function

*/
// const Car = require('../models/car')
// const models = (req, res, next) => {
//     console.log('Welcome to the Thunderdome! Again.')
//     req.models = {
//         Car,
//     }
//     next();
// }

module.exports = function(app){
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(methodOverride('_method'))
    // app.use(models)
}
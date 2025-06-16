/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const methodOverride = require('method-override');

const carRouter = require('./routes/car.js');
const authController = require('./controllers/authController.js');

require('./config/db.js');

/*------------------------------- Middlewares -------------------------------*/
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(methodOverride('_method'))

app.use('/auth', authController);
app.use('/cars', carRouter);



app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
    console.log('Welcome to the Thunderdome!')
})
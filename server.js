/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

const carRouter = require('./routes/car.js');
const authController = require('./controllers/authController.js');


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
}

connect();

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
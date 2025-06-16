/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
require('dotenv').config();
const middleware = require('./middleware/mid.js');
const carRouter = require('./routes/car.js');
const authController = require('./controllers/authController.js');

require('./config/db.js');

/*------------------------------- Middlewares -------------------------------*/
middleware(app);
app.use('/auth', authController);
app.use('/cars', carRouter);



app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
    console.log('Welcome to the Thunderdome!')
})
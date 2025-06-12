/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Car = require('./models/car');


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


/*------------------------------- Query Functions -------------------------------*/

// I.N.D.U.C.E.S.
// I - Show all fruits
// N - New - Returns a form to create new fruits
// D - Delete - Delete a fruit
// U - Update - PUT or PATCH to update a fruit
// C - Create - Handle POST to create new fruits
// E - Edit - Return a form to edit a fruit
// S - Show - Show a specific fruit

app.get('/', (req, res) => {
    res.render('index.ejs')
})

// INDEX --> GET /cars
app.get('/cars', async (req, res) => {
    const allCars = await Car.find()
    res.render('cars/index.ejs', { cars: allCars })
})

// NEW
app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs')
})

// DELETE
app.delete('/cars/:carId', async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
})

// UPDATE
app.put('/cars/:carId', async (req, res) => {
    console.log(req.body)
    if (req.body.isGoodForKids === 'on') {
        req.body.isGoodForKids = true;
    } else {
        req.body.isGoodForKids = false;
    }
    await Car.findByIdAndUpdate(req.params.carId, req.body)
    res.redirect(`/cars/${req.params.carId}`)
})

// CREATE
app.post('/cars', async (req, res) => {
    console.log(req.body)
    if (req.body.isGoodForKids === 'on') {
        req.body.isGoodForKids = true;
    } else {
        req.body.isGoodForKids = false;
    }

    try {
        await Car.create(req.body)
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
        return;
    }
    res.redirect('/cars')
})

// EDIT
app.get('/cars/:carId/edit', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/edit.ejs', { car: foundCar })
})

// SHOW
app.get('/cars/:carId', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/show.ejs', { car: foundCar })
})

app.listen(3000, () => {
    console.log('Welcome to the Thunderdome!')
})
const express = require('express');
const router = express.Router();
const Car = require('../models/car.js');

module.exports = router;


// I.N.D.U.C.E.S.
// I - Show all fruits
// N - New - Returns a form to create new fruits
// D - Delete - Delete a fruit
// U - Update - PUT or PATCH to update a fruit
// C - Create - Handle POST to create new fruits
// E - Edit - Return a form to edit a fruit
// S - Show - Show a specific fruit



// INDEX --> GET /cars
router.get('/cars', async (req, res) => {
    const allCars = await Car.find()
    res.render('cars/index.ejs', { cars: allCars })
})

// NEW
router.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs')
})

// DELETE
router.delete('/cars/:carId', async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
})

// UPDATE
router.put('/cars/:carId', async (req, res) => {
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
router.post('/cars', async (req, res) => {
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
router.get('/cars/:carId/edit', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/edit.ejs', { car: foundCar })
})

// SHOW
router.get('/cars/:carId', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/show.ejs', { car: foundCar })
})
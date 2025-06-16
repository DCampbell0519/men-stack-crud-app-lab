const Car = require('../models/car.js');

module.exports = {
    index,
    new: newCar,
    delete: deleteCar,
    update,
    create, 
    edit, 
    show,
}


// I.N.D.U.C.E.S.
// I - Show all fruits
// N - New - Returns a form to create new fruits
// D - Delete - Delete a fruit
// U - Update - PUT or PATCH to update a fruit
// C - Create - Handle POST to create new fruits
// E - Edit - Return a form to edit a fruit
// S - Show - Show a specific fruit



// INDEX --> GET /cars
async function index(req, res) {
    const allCars = await Car.find()
    res.render('cars/index.ejs', { cars: allCars })
}

// NEW
function newCar(req, res) {
    res.render('cars/new.ejs')
}

// DELETE
async function deleteCar(req, res) {
    await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
}

// UPDATE
async function update(req, res) {
    console.log(req.body)
    if (req.body.isGoodForKids === 'on') {
        req.body.isGoodForKids = true;
    } else {
        req.body.isGoodForKids = false;
    }
    await Car.findByIdAndUpdate(req.params.carId, req.body)
    res.redirect(`/cars/${req.params.carId}`)
}

// CREATE
async function create(req, res) {
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
}

// EDIT
async function edit(req, res) {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/edit.ejs', { car: foundCar })
}

// SHOW
async function show(req, res) {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/show.ejs', { car: foundCar })
}
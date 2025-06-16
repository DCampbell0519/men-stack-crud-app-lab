const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController.js');

module.exports = router;


// I.N.D.U.C.E.S.
// I - Show all fruits
// N - New - Returns a form to create new fruits
// D - Delete - Delete a fruit
// U - Update - PUT or PATCH to update a fruit
// C - Create - Handle POST to create new fruits
// E - Edit - Return a form to edit a fruit
// S - Show - Show a specific fruit

router.get('/', carController.index)
router.get('/new', carController.new)
router.delete('/:carId', carController.delete)
router.put('/:carId', carController.update)
router.post('/', carController.create)
router.get('/:carId/edit', carController.edit)
router.get('/:carId', carController.show)
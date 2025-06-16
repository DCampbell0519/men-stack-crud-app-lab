const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username })
    res.send('Got your info ' + req.body.username)
})

module.exports = router
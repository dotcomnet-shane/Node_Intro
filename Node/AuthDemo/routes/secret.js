const express = require('express');
const router = express.Router();
const User = require('../models/user');


const requireLogin = ((req, res,next) => {
    if(!req.session.user_id) {
        res.redirect('/login')
    }  else {
        next();
    }
})

router.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})

module.exports = router;
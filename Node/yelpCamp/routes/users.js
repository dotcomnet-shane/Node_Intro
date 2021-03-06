const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../Utils/catchAsync');


router.get('/register',(req,res) => {
    res.render('Users/register');
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const {username , email , password} = req.body;
        const user = await new User({username , email});
        const registeredUser = await User.register(user , password);
        req.login(registeredUser, (err) => {
            if(err) return next(err);
            req.flash('success' , 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })

    } catch(e) {
        req.flash('error',e.message);
        res.redirect('register');
    }

}))

router.get('/login',(req, res) => {
    res.render('Users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    console.log(redirectUrl);
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success','You have successfully logged out');
    res.redirect('/campgrounds');
})

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', (req,res) => {
    res.render('home');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async(req, res) => {
    const { username, password } = req.body
    // const hash = await bcrypt.hash(password,12);
    // console.log(hash);
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

router.get('/login',(req, res) => {
    res.render('login');
})

router.post('/login', async(req,res,next) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password)
    if(foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

module.exports = router;
const express = require('express');
const router = express.Router();
const catchAsync = require('../Utils/catchAsync');
const ExpressError = require('../Utils/ExpressError')
const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js');
const { isLoggedIn } = require('../middleware')


const validateCampground = ((req, res, next) => {

    const {error} = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
})

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    req.flash('success', 'Successfully created a new campground');
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    if(!campground) {
       req.flash('error', 'Campground No Longer Valid');
       return res.redirect('/campgrounds');
    }
    console.log(campground);
    res.render('campgrounds/show', { campground })
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById( id );
    res.render('campgrounds/edit', {campground});
}))

router.put('/:id', validateCampground, catchAsync(async( req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, { new: true});
    req.flash('success', 'You have successfully updated a campground');
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', catchAsync( async( req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete( id );
    req.flash('success', 'You have successfully deleted a campground');
    res.redirect('/campgrounds');
}))



module.exports = router;
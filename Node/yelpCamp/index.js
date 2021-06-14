const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash')
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const ExpressError = require('./Utils/ExpressError');
const catchAsync = require('./Utils/catchAsync');
const Review = require('./models/review');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')

const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const usersRoute = require('./routes/users');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected!");
})


app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUnintialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
    if(!['/login','/'].inludes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
})

app.use(express.urlencoded({extended: true }))
app.use(methodOverride('_method'))

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', usersRoute);

app.get('/fakeUser', async (req, res) => {
    const user = new User({email: 'test@test.com', username: 'test'});
    const newUser = await User.register(user, 'nugget');
    res.send(newUser);
})



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err });
    res.send('Oh Boy, Something Went Wrong');
})

app.listen( 3000, () => {
    console.log('Serving on port 3000!')
})


const express = require('express');
const morgan = require('morgan');
const AppError = require('./AppError')
const app = express();

// app.use(morgan('common'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
})

const verifyPassword = (req, res, next) => {
    const {password} = req.query;
    if (password === 'chickennugget') {
            next();
        }
        throw new AppError('password required', 401);
        }

app.use(morgan('common'));

// app.use((req, res, next) =>{
//     console.log('This is my first middleware!');
//     return next();
//     console.log('This is my first middleware after calling next');
// })
//
// app.use((req, res, next) =>{
//     console.log('This is my second middleware!');
//     return next();
// })
//
// app.use((req, res, next) =>{
//     console.log('This is my third middleware!');
//     return next();
// })

app.get('/secret', verifyPassword, (req, res) => {
    res.send('I love Starwars!')
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin', 403)
})

app.get('/', (req, res) => {
    console.log(`Request Time: ${req.requestTime}`);
    res.send('Homepage!');
})

app.get('/dogs', (req, res) => {
    console.log(`Request Time: ${req.requestTime}`);
    res.send('Woof Woof');
})



app.get('/error',(req, res) => {
    chicken.fly();
})

app.use((req, res) => {
    res.status(404).send('404: Not Found');
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong'} = err;
    req.status(status).send(message)
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})
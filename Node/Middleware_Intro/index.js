const express = require('express');
const morgan = require('morgan');
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
        } else {
        res.send('Sorry, No Dice, Better Luck Next Time')
        }
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

app.get('/', (req, res) => {
    console.log(`Request Time: ${req.requestTime}`);
    res.send('Homepage!');
})

app.get('/dogs', (req, res) => {
    console.log(`Request Time: ${req.requestTime}`);
    res.send('Woof Woof');
})

app.use((req, res) => {
    res.status(404).send('404: Not Found');
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})
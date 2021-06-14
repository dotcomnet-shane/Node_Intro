const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('thisismysecret'));

app.get(('/greet'), (req, res) => {
    const { name = 'anonymous', animal = 'Tiger Shrimp'} = req.cookies;
    res.send(`Why Hello there ${name}, I like ${animal}`);
})
app.get('/setName', (req, res) => {
    res.cookie('name', 'Stevie Chicks');
    res.cookie('animal', 'Harlequin Shrimp');
    res.send('OK SENT YOU A COOKIE');
})

app.get('/getSignedCookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true});
    res.send('NOW GIVING YOU A SIGNED COOKIE!');
})

app.get('/verifyFruit', (req, res) => {
    res.send(req.signedCookies);
})

app.listen(3000 ,() => {
    console.log('Listening on port 3000');
})
const express = require('express');
const app = express();
const User = require('./models/user')
const bcrypt = require('bcrypt')
const path = require('path');
const defaultRoute = require('./routes/default');
const secretRoute = require('./routes/secret');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/AuthDemo', { useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => {
      console.log("MONGOOSE CONNECTION OPEN!!!")
    })
        .catch(err => {
            console.log("OH NO MONGO CONNECTION ERROR!!!!")
            console.log(err);
        })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'ThisIsNotAGoodSecret'}))
app.use('/', defaultRoute);
app.use('/', secretRoute);

app.listen(3000, () => {
    console.log('Now serving on port 3000');
})

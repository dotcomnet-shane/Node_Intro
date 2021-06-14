const express = require('express');
const app = express();
const figlet = require('figlet');
const {v4: uuid} = require('uuid');
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded( {extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('public', path.join(__dirname,'public'));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.listen(3000, () => console.log('Now Listening On Port 3000'));

app.get('/', (req, res) => {
    res.render('index');

});

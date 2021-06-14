const express = require('express')
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const Product = require('./models/products');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
  console.log("Mongo Connection Open!")
})
    .catch(err => {
    console.log("Oh no, you have aMongo connection error")
    console.log(err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded ({extended: true}))
app.use(methodOverride('_method'))

app.get('/dog', (req, res ) => {
    res.send('Woof!')
})

const categories = ['fruit', 'vegetable', 'dairy', 'baked goods']

app.get('/products', async (req , res) => {
    const { category } = req.query;
    console.log(category)
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else { }
        const products = await Product.find({});
        res.render('products/index', { products, category : 'All' })
    })

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await  Product.findById(id)
    res.render('products/edit',{ product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async( req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.post('/products', async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${ newProduct._id }`)
})

app.get('/products/:id', async (req , res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
    console.log(product);
  res.render('products/show', {product});
})

app.listen(3000, () => {
    console.log('Now listening on port 3000!');
})


const express = require('express')
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const Product = require('./models/products');
const Farm = require('./models/farms')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStandTake2', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
  console.log("Mongo Connection Open!")
})
    .catch(err => {
    console.log("Oh no, you have a Mongo connection error")
    console.log(err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded ({extended: true}))
app.use(methodOverride('_method'))

//Farm Routes

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', {farms})
})

app.delete('/farms/:id', async(req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.get('/farms/:id', async(req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
    console.log(farm);
})

app.post('/farms', async(req, res) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    res.redirect('/farms');
})

app.get('/farms/:id/products/new', async(req, res) => {
    const { id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    console.log(farm.products);
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
})

// Product Routes

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
  const product = await Product.findById(id).populate('farm', 'name');
    console.log(product);
  res.render('products/show', {product});
})

app.listen(3000, () => {
    console.log('Now listening on port 3000!');
})


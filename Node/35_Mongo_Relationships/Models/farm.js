const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection successfully established with MongoDB using port 3000');
    })
    .catch(err => {
        console.log('Oh No, We have a mongoose connection error!');
        console.log(err);
    })


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Summer', 'Autumn', 'Winter', 'Spring']
    }
});

const farmSchema = new Schema({
    name: String ,
    city: String ,
    products: [{type: Schema.Types.ObjectID , ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model( 'Farm', farmSchema);

// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Sugar Baby Watermelon', price: 5.99, season: 'Summer'},
//     {name: 'Asparagus Spears', price: 3.99, season: 'Autumn'}
// ])

const makeFarm = async () => {
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA'});
    const melon = await Product.findOne({name: 'Goddess Melon'});
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({name: 'Full Belly Farms'});
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon'});
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm)
}

Farm.findOne({name: 'Full Belly Farms'}).populate('products').then( farm => console.log(farm));

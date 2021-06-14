const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopolgy: true })
    .then(() => {
        console.log("Connection Open!")
    })
    .catch (err => {
        console.log("Oh no, we have encountered an error")
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required:  true,
        min: [0, 'Price Must Be Positive You Dodo!']

    },
        onSale: {
        type: Boolean,
        default: false
    },
        categories: {
            type: [String],
        },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
        size: {
            type: String,
            enum: ['S', 'M', 'L']
        }

    })

productSchema.statics.fireSale = function() {
    return this.updateMany({}, { onSale: true, price: 0})
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}


productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.greet = function() {
    console.log("Hello!!!! Hi!!!! HOWDY!!!!")
    console.log(`- from ${this.name}`)
}

const Product = mongoose.model('Product', productSchema)

// const findProduct = async () => {
//     const foundProduct = await Product.findOne({ name: 'Mountain Bike'})
//     console.log(foundProduct);
//     await  foundProduct.toggleOnSale();
//     console.log(foundProduct);
//     await foundProduct.addCategory('Outdoors');
//     console.log(foundProduct);
// }

Product.fireSale().then(res => console.log(res))

// const bike = new Product ({ name: 'Knee Pads', price: 19.50, categories: ['Cycling'], size: 'L'})
// bike.save()
//     .then(data => {
//         console.log('It Worked!')
//         console.log(data)
//     })
//     .catch(err => {
//         console.log('Oh No, A Fatal Error Has Occurred!')
//         console.log(err)
//     })

// Product.findOneAndUpdate({name: 'Bicycle Pump'}, { price: -20.00 }, { new: true, runValidators: true})
//     .then(data => {
//         console.log('It Worked!')
//         console.log(data)
//     })
//     .catch(err => {
//         console.log('Oh No, A Fatal Error Has Occurred!')
//         console.log(err)
//     })
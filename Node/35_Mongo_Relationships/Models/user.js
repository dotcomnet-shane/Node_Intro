
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDB', {
    useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => {
            console.log('MONGODB CONNECTION ESTABLISHED!')
        })
        .catch(err => {
            console.log('OH NO, MONGO CONNECTION ERROR!')
            console.log(err);
        })


const userSchema = new mongoose.Schema({
        first: String,
        last: String,
        addresses: [
        {
            _id: { id : false },
            street: String,
            city: String,
            state: String,
            country: String
        }

    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async() => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '4 Privet Drive',
        city: 'Winkfield Row',
        state:  'Bracknell',
        country: 'London'
    })
    const res = await u.save();
    console.log(res);
}

const addAddress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '12 Grimmauld Place' ,
            city: 'London' ,
            state: 'London' ,
            country: 'London'
        }
    )
    const res = await user.save();
    console.log(res);
}

// makeUser();
addAddress('60b4a7e33624fd55f998a279');
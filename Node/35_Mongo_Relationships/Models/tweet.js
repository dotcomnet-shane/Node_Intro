mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection successfully Established!')
    })
    .catch(err => {
        console.log('Oh No, We have encountered an error');
        console.log(err);
    });

const userSchema = new Schema({
    username: String,
    age: Number,
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async() => {
    // const user = new User({ username: 'chickenfan99', age: 61});
    const user = await User.findOne({ username: 'chickenfan99'});
    const tweet2 = new Tweet({ text: 'Bock Bock Bock is the noise chickens make!', likes: 1239});
    tweet2.user = user;
    user.save();
    tweet2.save();
}

const findTweet = async () => {
    const t = await Tweet.find().populate('user');
    await console.log(t);
}
// makeTweets();
findTweet();
const express = require('express');
const app = express();

// app.use((req, res) => {
// res.send('<h1>This is my webpage!</h1>');

app.get('/', (req, res) => {
    res.send('This is the homepage!');
});

app.get('/r/:subreddit', (req,res) => {
    const { subreddit} = req.params;
    res.send(`<h1>You are currently viewing the ${subreddit} subreddit</h1>`);
})

app.get('/r/:subreddit/:postId', (req,res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>You are currently viewing the Post ID ${postId} on the ${subreddit} subreddit</h1>`);
})

app.get('/cats', (req,res) => {
        res.send('Meow!');
    });

app.get('/dogs',(req, res) => {
    res.send('Woof!');
});

app.post('/mice', (req, res) => {
    res.send('This is a post request, it is completely different from a get request!');
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if(!q) {
        res.send('Nothing Found If Nothing Searched, try again next time');
    }
    res.send(`<h1>Search results for: ${q}</h1>`)
})

app.get('*', (req, res) => {
    res.send('Im sorry I do not that route');
})

app.listen(3000, () => console.log('Listening on port 3000!'));
const jokes = require('give-me-a-joke');
const colors = require('colors')

 jokes.getRandomDadJoke(function (joke) {
    console.log(jokes);
    console.log(joke.rainbow);
});

 jokes.getRandomCNJoke(function (newJoke) {
     console.log(newJoke.rainbow);
 });

const express = require('express')
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All Shelters');
})

router.get('/:id', (req, res) => {
    res.send('Viewing One Shelter');
})

router.get('/:id/edit', (req, res) => {
    res.send('Edit One Shelter');
})

router.post('/', (req, res) => {
    res.send('Create A Shelter');
})

module.exports = router;
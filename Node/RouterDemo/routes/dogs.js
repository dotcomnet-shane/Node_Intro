const express= require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All Dogs!')
})

router.get('/:id', (req, res) => {
    res.send('Viewing A Specific Dog')

})
router.get('/:id/edit', (req, res) => {
    res.send('Editing A Specific Dog!')

})

router.post('/', (req, res) => {
    res.send('Creating A Dog!')
})




module.exports = router;
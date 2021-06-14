const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs');
const adminroutes = require('./routes/admin')

app.use('/shelters', shelterRoutes);
app.use('/dogs', dogRoutes);
app.use('/admin', adminroutes);

app.listen(3000, () => {
    console.log('Now listening on port 3000');
})
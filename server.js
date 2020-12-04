const express = require('express');
const path = require('path');
const app = express();
const api = require('./server/routes/api');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weather', {useNewUrlParser: true});

app.use('/', api);
app.use(express.static(path.join(__dirname, 'dist')));

const port = 3000;
app.listen(port, function() {
    console.log(`Running on port ${port}`);
})
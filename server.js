const express = require('express');
const path = require('path');
const app = express();
const api = require('./server/routes/api');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/yourDB');


app.use('/', api);
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = 3000;
app.listen(process.env.PORT || PORT, function() {
    console.log(`Running`);
})
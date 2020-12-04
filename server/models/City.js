const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityChema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('City', cityChema);
module.exports = City;

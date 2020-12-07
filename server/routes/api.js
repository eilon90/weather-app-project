const express = require('express');
const router = express.Router();
const urllib = require('urllib');
const countries = require('i18n-iso-countries')

router.use(express.json());
router.use(express.urlencoded({extended: false}));

const City = require('../models/City');

router.get('/city/:cityName', function(req, res) {
    const city = req.params.cityName;
    const apiKey = '98539e44ecc40080b0384f0e5fdac654';
    urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, function(err, response1) {
        const cityData = JSON.parse(response1.toString());
        if (cityData.cod === '404') {
            res.send({error: true})    
        }
        else {
            urllib.request(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${cityData.name}`, function(err, response2) {
                const stringData = response2.toString();
                const picUrl = stringData.includes('"source"') ? stringData.split('"source":"')[1].split('"')[0] : 'https://image.freepik.com/free-vector/city-illustration_23-2147514701.jpg';

                const finalData = {
                    name: `${cityData.name}, ${countries.getName(cityData.sys.country, "en")}`,
                    temperature: cityData.main.temp,
                    condition: cityData.weather[0].description,
                    conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
                    picture: picUrl
                }
                res.send(finalData);
            })
        }
    });
})

router.get('/cities', async function(req, res) {
    const citiesData = [];
    const cities = await City.find({});
    const apiKey = '98539e44ecc40080b0384f0e5fdac654';
    let num = 0;
    await cities.forEach(c => {
        urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${c.name}&units=metric&appid=${apiKey}`, function(err, response) {
            const cityData = JSON.parse(response.toString());
            const finalData = {
                name: `${cityData.name}, ${countries.getName(cityData.sys.country, "en")}`,
                temperature: cityData.main.temp,
                condition: cityData.weather[0].description,
                conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
                picture: c.picture,
                displayOrder: cities.indexOf(c)
            }
            citiesData.push(finalData);
            num++;
            if (num === cities.length) {
                citiesData.sort(function(a, b) {
                    return a.displayOrder - b.displayOrder
                });
                res.send(citiesData);
            }
        })
    })
})

router.post('/city', async function(req, res) {
    const city = new City({...req.body});
    const savedCity = await city.save();
    console.log(`saved ${savedCity.name}`);
    res.end();
})

router.delete('/city/:cityName', async function(req, res) {
    const city = await City.findOneAndRemove({name: req.params.cityName});
    console.log(`${city.name} deleted`);
    res.end();
})

module.exports = router
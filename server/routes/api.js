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
    urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, function(err, response) {
        const cityData = JSON.parse(response.toString());
        if (cityData.cod === '404') {
            res.send({error: true})    
        }
        else {
            const finalData = {
                name: `${cityData.name}, ${countries.getName(cityData.sys.country, "en")}`,
                temperature: cityData.main.temp,
                condition: cityData.weather[0].description,
                conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
            }
            res.send(finalData);
        }
    });
})

router.get('/cities', async function(req, res) {
    const cities = await City.find({});
    const relData = cities.map(c => {return {
        name: c.name,
        temperature: c.temperature,
        condition: c.condition,
        conditionPic: c.conditionPic
    }});
    res.send(relData);
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

// router.put('/cities', async function(req, res) {
//     const cities = await City.find({});
//     cities.forEach(async c => {
//         cityName = c.name.split(',')[0];
//         const apiKey = '98539e44ecc40080b0384f0e5fdac654';
//         urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`, function(err, response) {
//             const cityData = JSON.parse(response.toString());
//             const finalData = {
//                 name: `${cityData.name}, ${countries.getName(cityData.sys.country, "en")}`,
//                 temperature: cityData.main.temp,
//                 condition: cityData.weather[0].description,
//                 conditionPic: `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
//             }
//         });
//     })
//     res.end();
// })



module.exports = router


// router.delete('/city/:cityName', function(req, res) {
//     console.log('hi');
//     console.log(req.params.cityName);
//     City.findOneAndRemove({name: req.params.cityName}, function(err, docs) {
//         console.log(docs);
//     });
//     res.end();
// })


// {
//     "coord":
//     {
//         "lon":35.22,
//         "lat":31.77
//     },
//     "weather":
//     [{
//         "id":801,
//         "main":"Clouds",
//         "description":"few clouds",
//         "icon":"02d"
//     }],
//     "base":"stations",
//     "main":
//     {
//         "temp":17.22,
//         "feels_like":15.86,
//         "temp_min":15.56,
//         "temp_max":20,
//         "pressure":1010,
//         "humidity":65
//     },
//     "visibility":10000,
//     "wind":
//     {
//         "speed":2.24,
//         "deg":327
//     },
//     "rain":
//     {
//         "1h":0.1
//     },
//     "clouds":
//     {
//         "all":13
//     },
//     "dt":1606915300,
//     "sys":
//     {
//         "type":3,
//         "id":2004982,
//         "country":"IL",
//         "sunrise":1606882948,
//         "sunset":1606919712
//     },
//     "timezone":7200,
//     "id":281184,
//     "name":"Jerusalem",
//     "cod":200
// }
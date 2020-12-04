const apiManager = new APIManager;
const renderer = new Renderer;

async function loadPage() {
    const data = await apiManager.getDataFromDB();
    renderer.renderData(data);
}

async function handleSearch(city) {
    const data = await apiManager.getCityData(city);
    renderer.renderData(data);
}

$('#new-city-button').on('click', function() {
    const city = $('#input').val();
    handleSearch(city);
})

$('body').on('click', '.save', function() {
    const cityName = $(this).closest('.city').find('.city-name').text();
    apiManager.saveCity(cityName);
    const deleteButton = $('<button class = "delete">Delete From Memory</button>');
    $(this).closest('.city').append(deleteButton);
    $(this).remove();
})

$('body').on('click', '.delete', function() {
    const cityName = $(this).closest('.city').find('.city-name').text();
    apiManager.removeCity(cityName);
    const saveButton = $('<button class = "save">Save In Memory</button>');
    $(this).closest('.city').append(saveButton);
    $(this).remove();    
})

$('body').on('click', '.x', function() {
    const cityName = $(this).closest('.city').find('.city-name').text();
    const data = apiManager.hideCity(cityName);
    renderer.renderData(data); 
})

loadPage();






// const a = apiManager.getDataFromDB();
// const b = apiManager.getCityData('Toronto');
// // const c = apiManager.removeCity('Paris, France');
// Promise.all([a, b]).then(function(c){
//     console.log(apiManager.cityData);
// })

// // apiManager.getDataFromDB()
// // .then(function(a) {apiManager.getCityData('Paris')});

// // apiManager.getCityData('paris')
// // .then(function(a) {apiManager.getDataFromDB()});

// // "We couldn't find this name. please make sure you spell it correctly"

// renderer.renderData([{
//     condition: "clear sky",
//     conditionPic: "http://openweathermap.org/img/wn/01d@2x.png",
//     isSaved: true,
//     name: "Haifa, Israel",
//     temperature: 21.3
// },
// {  
//     name: "Cusco, Peru",
//     temperature: 12,
//     condition   : "few clouds",
//     conditionPic: "http://openweathermap.org/img/wn/02d@2x.png"
// }]);
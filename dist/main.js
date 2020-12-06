const apiManager = new APIManager;
const renderer = new Renderer;

async function loadPage() {
    const data = await apiManager.getDataFromDB();
    renderer.renderData(data);
}

async function handleSearch(city) {
    const data = await apiManager.getCityData(city);
    if (data === 'error') {
        renderer.noCity();
    }
    else {
        renderer.renderData(data);
    }
}

$('#new-city-button').on('click', function() {
    const city = $('#input').val();
    if (city) {
        handleSearch(city);
        $('#input').val('');
    }
})

$('body').on('click', '.save', function() {
    const cityName = $(this).closest('.city').find('.city-name').text();
    const picture = $(this).closest('.city').find('.city-picture').attr('src');
    apiManager.saveCity(cityName, picture);
    const deleteButton = $('<button class = "delete">Delete From Memory</button>');
    $(this).closest('.city-bottom').append(deleteButton);
    $(this).remove();
})

$('body').on('click', '.delete', function() {
    const cityName = $(this).closest('.city').find('.city-name').text();
    apiManager.removeCity(cityName);
    const saveButton = $('<button class = "save">Save In Memory</button>');
    $(this).closest('.city-bottom').append(saveButton);
    $(this).remove();    
})

$('body').on('click', '.x', function() {
    const cityName = $(this).closest('.city').find('.city-name').text();
    const data = apiManager.hideCity(cityName);
    renderer.renderData(data); 
})

loadPage();
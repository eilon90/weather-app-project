class APIManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        const cities = await $.get('/cities');
        cities.forEach(c => {
            if (this.cityData.every(d => d.name !== c.name)) {
                c.isSaved = true;
                this.cityData.unshift(c);
            }
        })
        return this.cityData;
    }

    async getCityData(name) {
        const cityName = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
        const city = await $.get(`/city/${cityName}`);
        if (city.error === true) {
            return 'error';
        }
        city.isSaved = false;
        if (this.cityData.some(c => c.name === city.name)) {
            const cityPlace = this.cityData.indexOf(this.cityData.find(c => c.name === city.name));
            this.cityData.splice(cityPlace, 1, city);
        }
        else {
            this.cityData.unshift(city);
        }
        return this.cityData;
    }

    async saveCity(name, picture) {
        const cityName = name.split(',')[0];
        const data = {name: cityName, picture: picture}
        await $.post('/city', data);
        this.cityData.find(c => c.name === name).isSaved = true;
    }

    removeCity(name) {
        const cityName = name.split(',')[0];
        $.ajax({
            method: 'DELETE',
            url: `/city/${cityName}`,
            success: res => {
                this.cityData.find(c => c.name === name).isSaved = false;
                console.log(`${cityName} deleted`);
            },
            error: function(xhr, text, error) {
                console.log(text);
            }
        })
    }

    hideCity(cityName) {
        const cityPlace = this.cityData.indexOf(this.cityData.find(c => c.name === cityName));
        this.cityData.splice(cityPlace, 1);
        return this.cityData;        
    }
}






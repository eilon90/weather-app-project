class Renderer {
    
    renderData(data) {
        $('#container').empty();
        const source = $('#cities-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('#container').append(newHTML);
    }

    noCity() {
        $('#manager').append($(`<h3 id = "no-city">We couldn't find this name. please make sure you spell it correctly</h3>`));
        setTimeout(function() {
            $('#no-city').remove();
        }, 4000);
    }
}

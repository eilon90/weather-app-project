class Renderer {
    
    renderData(data) {
        $('#container').empty();
        const source = $('#cities-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('#container').append(newHTML);
    }
}

// renderData(data) {
//     $('#container').empty();
//     data.forEach(d => {
//         const source = $('#cities-template').html();
//         const template = Handlebars.compile(source);
//         const newHTML = template(d);
//         if (d.isSaved === false) {
//             $(this).find('.save/delete').css('color', 'red');
//         }
//         $('#container').append(newHTML);
//     })
// }








// const source = $('#cities-template').html();
// const template = Handlebars.compile(source);
// const newHTML = template({
//     condition: "clear sky",
//     conditionPic: "http://openweathermap.org/img/wn/01d@2x.png",
//     isSaved: true,
//     name: "Haifa, Israel",
//     temperature: 21.3
// });
// $('#container').append(newHTML);
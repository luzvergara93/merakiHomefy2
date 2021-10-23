






////////// Animar el Logo al comienzo /////////////

//$('.container-fluid').prepend('<img src="imgs/logo.jpg" id="logo">');
    

// $('#logo')
//     .animate({
//         "width": "20%",
//     }, 2000)
//     .animate({
//         "width": "100px",
//         "height": "100px",
//     }, 2000);



////// Traer imagenes random sobre diferentes partes de la casa ///////

var apiKey = '23955266-33c9870af76f27031e4d59e56';

let searchImg = (word) => { 
    
    var URL = "https://pixabay.com/api/?key="+apiKey+"&q="+encodeURIComponent(word);
    
    $.getJSON(URL, function(data){
        if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ 
                console.log(hit.largeImageURL); 

                var img = $('<img />', { 
                    id: 'photo',
                    src: `${hit.largeImageURL}`,
                    alt: 'MyAlt'
                });
                img.appendTo($('#photos'));
            });
        else
            console.log('No hits');
        } );
}

$('#living').click( () => {
    $('#photos').empty();
    searchImg('living decoration');
});

$('#kitchen').click( () => {
    $('#photos').empty();
    searchImg('kitchen decoration');
});

$('#bathroom').click( () => {
    $('#photos').empty();
    searchImg('bathroom decoration');
});

$('#bedroom').click( () => {
    $('#photos').empty();
    searchImg('bedroom decoration');
});

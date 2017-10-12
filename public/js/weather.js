//Google Maps submit 
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 33.669, lng: -117.823 }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

    //Google AutoComplete
    var options = {
        types: ['(cities)'],
    };

    var input = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    //OpenWeatherMap Request
    $(document).ready(function() {

        $('#submit').click(function() {

            var city = $("#address").val();

            if (city != '') {
                $.ajax({

                    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=f46e494a36105a4717feab8bd6201b69",
                    type: "GET",
                    dataType: "jsonp",
                    success: function(data) {
                        console.log(data);
                        var weatherData = show(data);

                        $("#show").html(weatherData);
                    }
                });
            } else {
                $("#error").html("Please insert city");
            }
        });
    });
}
//Gets value from address value and pins marker on Google maps
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            $("#error").html("<div class='alert alert-danger text-center' style='font-weight:20px'>Please insert city!</div>");
        }
    });
}
//Display OpenWeather Map Data
function show(data) {
    return "<h2>Current Weather for " + data.name + "," + data.sys.country + "</h2>" +
        "<h3><strong>Weather</strong>: <img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>" + data.weather[0].main + "</h3>" +
        "<h3><strong>Temperature</strong>: " + data.main.temp + " °F</h3>" +
        "<h3><strong>Humidity</strong>: " + data.main.humidity + " %</h3>" +
        "<h3><strong>Wind Speed</strong>: " + data.wind.speed + " MPH</h3>";
}
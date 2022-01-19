// require('dotenv').config();
let gymLocation = [];
let searchArea = {};

function yelpApi() {
    var apiUrl = 'https://uatapi.smartechc.com/api/test/yelpsearch?term=gym&radius=1000&location=11209&open_now=false&limit=10'; //change limit to 10 , change location to geo.location of user , change search field to gyms 
    fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(responses => responses.json()).then(data => {
        console.log(data);
        searchArea = {
            lat: data.region.center.latitude,
            long: data.region.center.longitude
        };
        data.businesses.forEach(business => {
            var object = {
                name: business.name,
                lat: business.coordinates.latitude,
                long: business.coordinates.longitude
            };
            gymLocation.push(object);
        });
        console.log(gymLocation);
        initMap();
    });
}

// GOogle Map API Function
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {
            lat: searchArea.lat,
            lng: searchArea.long
        }
    });
    var infoWindow = new google.maps.InfoWindow({});

    var marker, count;

    for (count = 0; count < gymLocation.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(gymLocation[count].lat, gymLocation[count].long),
            map: map,
            title: gymLocation[count].name
        });
        google.maps.event.addListener(marker, 'click', (function(marker, count) {
            return function() {
                infoWindow.setContent(gymLocation[count].name);
                infoWindow.open(map, marker);
            }
        })(marker, count));
    }

};


yelpApi();
// require('dotenv').config();
let gymLocation = [
    {
        "name": "Planet Fitness",
        "lat": 40.834633,
        "long": -73.944824
    },
    {
        "name": "Soul Fit NYC",
        "lat": 40.8268890380859,
        "long": -73.9496231079102
    },
    {
        "name": "Urban Yoga Foundation",
        "lat": 40.830655,
        "long": -73.946389
    },
    {
        "name": "Work Hard Train Harder Fitness and Wellness Center",
        "lat": 40.8187408447266,
        "long": -73.942626953125
    },
    {
        "name": "Hurricane Fitness",
        "lat": 40.81975,
        "long": -73.94275
    },
    {
        "name": "La Femme Suite",
        "lat": 40.817543,
        "long": -73.942337
    },
    {
        "name": "All Level Fitness",
        "lat": 40.74462,
        "long": -73.98689
    },
    {
        "name": "A More Perfect Union",
        "lat": 40.81847,
        "long": -73.94331
    }
];
// function yelpApi() {
//    var apiUrl = 'https://uatapi.smartechc.com/api/test/yelpsearch?term=gym&radius=1000&location=10031&open_now=true&limit=10'; //change limit to 10 , change location to geo.location of user , change search field to gyms 
//    fetch(apiUrl, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json'}
// }).then(responses => responses.json()).then(data => {
//     data.businesses.forEach(business => {
//         var object = {
//             name: business.name,
//             lat: business.coordinates.latitude,
//             long: business.coordinates.longitude
//         };
//         gymLocation.push(object);
//     });
//     console.log(gymLocation);
// });
// }

// GOogle Map API Function
function initMap() {
   map = new google.maps.Map(document.getElementById("map"), {zoom: 14, center: {
        lat: gymLocation[0].lat,
        lng: gymLocation[0].long
    }});
    var  infoWindow = new google.maps.InfoWindow({});

    var marker, count;
    
    for (count = 0; count < gymLocation.length; count++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(gymLocation[count].lat, gymLocation[count].long),
      map: map,
      title: gymLocation[count].name
    }); 
    google.maps.event.addListener(marker, 'click', (function (marker, count) {
        return function () {
          infoWindow.setContent(gymLocation[count].name);
          infoWindow.open(map, marker);
        }
      })(marker, count));
    }

};


// yelpApi();

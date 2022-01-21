// require('dotenv').config();
let gymLocation = [];
let searchArea = {};

async function yelpApi() {
   var location = document.getElementById('locationInput').value;
   const response = await fetch(`/api/map/${location}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }}
   )
   if(response.ok) {
     response.json().then(data => {
      searchArea = {
        lat: data.region.center.latitude,
        long: data.region.center.longitude
      }
      data.businesses.forEach(business => {
        var object = {
            name: business.name,
            lat: business.coordinates.latitude,
            long: business.coordinates.longitude
        };
        gymLocation.push(object);
      });
      initMap();
    });
  }
}

// GOogle Map API Function
function initMap() {
   map = new google.maps.Map(document.getElementById("map"), {zoom: 14, center: {
        lat: searchArea.lat,
        lng: searchArea.long
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
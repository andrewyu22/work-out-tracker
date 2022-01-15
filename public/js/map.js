// require('dotenv').config();

function yelpApi() {
   var apiUrl = 'https://uatapi.smartechc.com/api/test/yelpsearch?term=gym&radius=500&location=10031&open_now=true&limit=50'; //change limit to 10 , change location to geo.location of user , change search field to gyms 
   fetch(apiUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': ''}
}).then(responses => responses.json()).then(data => console.log(data));
}

yelpApi();


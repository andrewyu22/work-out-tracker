'use strict';
require('dotenv');
const router = require('express').Router();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.yelpAPI);

// Takes location parameters
router.get('/', (req,res) => {
    // calls yelp package and search parameters
    client.search({
        term: 'gym',
        radius: 1000,
        location: '11209',
        limit: 10
      }).then(data => {
          // return json data
          return res.json(data.jsonBody);
      });
})

module.exports = router;
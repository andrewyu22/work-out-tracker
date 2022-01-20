const router = require('express').Router();

const homeRoutes = require('./home-route');
const apiRoutes = require('./api/');

// home-routes
router.use('/', homeRoutes);
// api routes
router.use('/api', apiRoutes);

module.exports = router;
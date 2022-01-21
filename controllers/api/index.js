const router = require('express').Router();

const userRoutes = require('./user-route');
const exerciseRoute = require('./exercise-route');
const mapRoutes = require('./map-route');

// api/users routes
router.use('/users', userRoutes);
// api/exercise routes
router.use('/exercise', exerciseRoute);
// api/map routes
router.use('/map', mapRoutes);

module.exports = router;
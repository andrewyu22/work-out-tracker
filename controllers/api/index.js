const router = require('express').Router();

const userRoutes = require('./user-route');
const exerciseRoute = require('./exercise-route');

// api/users routes
router.use('/users', userRoutes);
// api/exercise routes
router.use('/exercise', exerciseRoute);

module.exports = router;
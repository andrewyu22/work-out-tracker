const router = require('express').Router();

const userRoutes = require('./user-route');
const exerciseRoute = require('./exercise-route');

router.use('/users', userRoutes);
router.use('/exercise', exerciseRoute);

module.exports = router;
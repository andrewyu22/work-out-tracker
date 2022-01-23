const router = require('express').Router();
const Exercise = require('../models/Exercise');
const withAuth = require('../utils/auth');

// Homepage Route
router.get('/', (req, res) => {
    // Render Homepage view and pass parameter loggedIn & Picture
    res.render('homepage', { loggedIn: req.session.loggedIn, picture: req.session.picture });
});

// LogIn Route
router.get('/login', (req, res) => {
    // If loggedIn session, redirect to homepage Route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Else render login view
    res.render('login');
});

// Sign Up Route
router.get('/signup', (req, res) => {
    // Render signup View
    res.render('signup');
});

// About Route
router.get('/about', (req, res) => {
    // Render about view and pass parameter loggedIn & Picture
    res.render('about', { loggedIn: req.session.loggedIn, picture: req.session.picture });
});

// Near By Gym Route
router.get('/gym', (req, res) => {
    // Render nearbygym view and pass parameter loggedIn & Picture
    res.render('nearbygym', { loggedIn: req.session.loggedIn, picture: req.session.picture });
});

// Workout Route
router.get('/workout', withAuth, (req, res) => {
    // Render workout view and pass parameter loggedIn & Picture
    res.render('workout', { loggedIn: req.session.loggedIn, picture: req.session.picture });
});

// Profile Route
router.get('/profile', withAuth, (req, res) => {
    // Render profile view and pass parameter loggedIn & Picture
    res.render('profile', { loggedIn: req.session.loggedIn, picture: req.session.picture })
});

// Exercise Route - Get all activity by user & date
router.get('/exercise/:date', withAuth, (req, res) => {
    //get all exercise bas off user & date
    Exercise.findAll({
            where: {
                user_id: req.session.user_id,
                date: req.params.date
            }
        })
        .then(dbData => {
            // return data responses in JSON
            return res.json(dbData);
        })
        .catch(err => {
            // Catch Error & Log it
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
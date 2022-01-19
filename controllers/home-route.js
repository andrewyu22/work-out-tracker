const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    res.render('homepage', {loggedIn: req.session.loggedIn});
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/about', (req, res) => {
    res.render('about', {loggedIn: req.session.loggedIn});
})

router.get('/gym', (req, res) => {
    res.render('nearbygym', {loggedIn: req.session.loggedIn});
})

module.exports = router;
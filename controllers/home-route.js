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
    if(req.session.loggedIn) {
        res.render('about', {loggedIn: req.session.loggedIn});
        return;
    }
    res.render('login');
})

module.exports = router;
const router = require('express').Router();
const sequelize = require('../config/connection');
const Exercise = require('../models/Exercise');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/about', (req, res) => {
    res.render('about', { loggedIn: req.session.loggedIn });
});

router.get('/gym', (req, res) => {
    res.render('nearbygym', { loggedIn: req.session.loggedIn });
});

router.get('/workout', (req, res) => {
    res.render('workout', { loggedIn: req.session.loggedIn });
});

router.post('/exercise', withAuth, (req, res) => {
    //get all exercise basis off user & date
    Exercise.findAll({
            where: {
                user_id: req.session.user_id,
                date: req.body.date
            }
        })
        .then(dbData => {
            const activity = dbData.map(data => data.get({ plain: true }));
            res.render('workout', {
                activity,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


module.exports = router;
const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models/User');
const withAuth = require('../utils/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn, picture: req.session.picture });
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
    res.render('about', { loggedIn: req.session.loggedIn, picture: req.session.picture });
});

router.get('/gym', (req, res) => {
    res.render('nearbygym', { loggedIn: req.session.loggedIn, picture: req.session.picture });
});

router.get('/workout', (req, res) => {
    res.render('workout', { loggedIn: req.session.loggedIn, picture: req.session.picture });
});

router.get('/profile', (req, res) => {
    res.render('profile', { loggedIn: req.session.loggedIn, picture: req.session.picture })
})

router.post('/image', upload.single('image_name'), (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    console.log("READING PATH: ", req.file.path.replace('public\\uploads\\', ''));
    console.log(req.body);
    User.update({
        profilePicture: req.file.path.replace('public\\uploads\\', '')
    }, {
        where: {
            id: req.session.user_id
        }
    }).then(answer => {
        console.log(answer);
        res.redirect('/');
    })
});

module.exports = router;
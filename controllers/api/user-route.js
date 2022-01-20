const router = require('express').Router();
const User = require('../../models/User');
const multer = require('multer');
// Used to save the image file in a specific folder path
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
// Multer's Upload function
const upload = multer({ storage: storage });

//get all users
router.get('/', (req, res) => {
    // Get all Data but excluding password
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            // Catch Error & Log it            
            console.log(err);
            res.status(500).json(err);
        });
});

// Get 1 User by Id
router.get('/:id', (req, res) => {
    // Get 1 day base off Id and excluding password
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            // If users cannot be found respond with json "No users found with this id"
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            // Else repond with json the user data excluding password
            res.json(dbUserData);
        })
        .catch(err => {
            // Catch Error & Log it
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a New Users for (SignUp page)
router.post('/', (req, res) => {
    // expects { first_name: 'Jane', last_name: 'Doe', username: 'johndoe', email: 'email@gmail.com', password: 'password1234'}
    User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => {
            // Save Users Information to session
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.first_name = dbUserData.first_name;
                req.session.last_name = dbUserData.last_name;
                req.session.picture = dbUserData.profilePicture;
                req.session.loggedIn = true;
                res.json(dbUserData);
            });
        })
        .catch(err => {
            // Catch Error & Log it 
            console.log(err);
            res.status(500).json(err);
        });
});

// Used to Login 
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        // If they cannot find email, respond message "No user with that email address!"
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        // Calls the Users Class Checkpassword Function
        const validPassword = dbUserData.checkPassword(req.body.password);
        // If password is wrong, respond message "Incorrect Password"
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        // Save Users Information to session
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.first_name = dbUserData.first_name;
            req.session.last_name = dbUserData.last_name;
            req.session.picture = dbUserData.profilePicture;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// Log out of the system
router.post('/logout', (req, res) => {
    // Check if loggedIn & Destroy the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Update Users information
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            // If users cannot be found respond with json "No users found with this id"
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            // Catch Error & Log it 
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete users by Id
router.delete('/:id', (req, res) => {
    // Deletes the Users base off User_Id
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Post image to uploads folder with multer and update Users database ProfilePicture name
router.post('/image', upload.single('image_name'), (req, res) => {
    // expects {profilePicture: 'empty.png'}
    let fileName = req.file.path.replace('public\\uploads\\', '');
    User.update({
            // update users profilePicture name in the User's Table base off User_Id
            profilePicture: fileName
        }, {
            where: {
                id: req.session.user_id
            }
        }).then(dbUserData => {
            // reload the save session and render back to homepage with new picture
            req.session.reload(() => {
                req.session.user_id = req.session.user_id;
                req.session.picture = req.file.path.replace('public\\uploads\\', '');
                req.session.loggedIn = true;
                res.render('homepage', { loggedIn: req.session.loggedIn, picture: req.session.picture });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });;
});


module.exports = router;
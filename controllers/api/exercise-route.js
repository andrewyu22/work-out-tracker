const router = require('express').Router();
const Exercise = require('../../models/Exercise');
const withAuth = require('../../utils/auth');

//Get all Exercises
router.get('/', (req, res) => {
    Exercise.findAll()
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new exercise to store into Database
router.post('/', (req, res) => {
    // expects { user_id: 1, name: 'Running', type: 'Cardio', duration: 30, date: 2021-03-01}
    Exercise.create({
            user_id: req.session.user_id,
            name: req.body.name,
            type: req.body.type,
            duration: req.body.duration,
            date: req.body.date
        })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update Exercises
router.put('/:id', withAuth, (req, res) => {
    Exercise.update({
            name: req.body.name,
            type: req.body.type,
            duration: req.body.duration
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No exercise found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete Exercises
router.delete('/:id', (req, res) => {
    Exercise.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No exercise found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Exercise Route - Get all activity by user & date
router.get('/getExercise/:date', withAuth, (req, res) => {
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
const router = require('express').Router();
const Exercise = require('../../models/Exercise');
const withAuth = require('../../utils/auth');

//get all users
router.get('/', (req, res) => {
    Exercise.findAll()
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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

module.exports = router;
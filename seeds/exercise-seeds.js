const sequelize = require('../config/connection');
const { Exercise } = require('../models');

const exercisedata = [{
        user_id: '1',
        name: 'Running',
        type: 'Cardio',
        duration: '60',
        date: '2022-01-17'
    },
    {
        user_id: '1',
        name: 'Bench Press',
        type: 'Resistances',
        duration: '30',
        date: '2022-01-17'
    }, {
        user_id: '2',
        name: 'Bench Press',
        type: 'Resistances',
        duration: '45',
        date: '2022-01-17'
    },
    {
        user_id: '2',
        name: 'Dumbbell Curls',
        type: 'Resistances',
        duration: '25',
        date: '2022-01-17'
    },
    {
        user_id: '2',
        name: 'Hammer Curls',
        type: 'Resistances',
        duration: '35',
        date: '2022-01-17'
    }, {
        user_id: '3',
        name: 'Running',
        type: 'Carido',
        duration: '90',
        date: '2022-01-17'
    }
];

const seedExercises = () => Exercise.bulkCreate(exercisedata, { individualHooks: true });

module.exports = seedExercises;
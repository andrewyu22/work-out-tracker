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
        type: 'Resistance',
        duration: '30',
        date: '2022-01-17'
    },
    {
        user_id: '2',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '45',
        date: '2022-01-17'
    },
    {
        user_id: '2',
        name: 'Dumbbell Curls',
        type: 'Resistance',
        duration: '25',
        date: '2022-01-17'
    },
    {
        user_id: '2',
        name: 'Hammer Curls',
        type: 'Resistance',
        duration: '35',
        date: '2022-01-17'
    },
    {
        user_id: '3',
        name: 'Running',
        type: 'Cardio',
        duration: '90',
        date: '2022-01-17'
    },
    {
        user_id: '3',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '90',
        date: '2022-01-17'
    },
    {
        user_id: '3',
        name: 'Push Up',
        type: 'Cardio',
        duration: '15',
        date: '2022-01-17'
    },
    {
        user_id: '1',
        name: 'Running',
        type: 'Cardio',
        duration: '60',
        date: '2022-01-17'
    },
    {
        user_id: '1',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '30',
        date: '2022-01-18'
    },
    {
        user_id: '2',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '45',
        date: '2022-01-18'
    },
    {
        user_id: '2',
        name: 'Dumbbell Curls',
        type: 'Resistance',
        duration: '25',
        date: '2022-01-18'
    },
    {
        user_id: '2',
        name: 'Hammer Curls',
        type: 'Resistance',
        duration: '35',
        date: '2022-01-18'
    },
    {
        user_id: '3',
        name: 'Running',
        type: 'Cardio',
        duration: '90',
        date: '2022-01-18'
    },
    {
        user_id: '3',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '90',
        date: '2022-01-18'
    },
    {
        user_id: '3',
        name: 'Push Up',
        type: 'Cardio',
        duration: '15',
        date: '2022-01-18'
    },
    {
        user_id: '1',
        name: 'Running',
        type: 'Cardio',
        duration: '60',
        date: '2022-01-17'
    },
    {
        user_id: '1',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '30',
        date: '2022-01-19'
    },
    {
        user_id: '2',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '45',
        date: '2022-01-19'
    },
    {
        user_id: '2',
        name: 'Dumbbell Curls',
        type: 'Resistance',
        duration: '25',
        date: '2022-01-19'
    },
    {
        user_id: '2',
        name: 'Hammer Curls',
        type: 'Resistance',
        duration: '35',
        date: '2022-01-19'
    },
    {
        user_id: '3',
        name: 'Running',
        type: 'Cardio',
        duration: '90',
        date: '2022-01-19'
    },
    {
        user_id: '3',
        name: 'Bench Press',
        type: 'Resistance',
        duration: '90',
        date: '2022-01-19'
    },
    {
        user_id: '3',
        name: 'Push Up',
        type: 'Cardio',
        duration: '15',
        date: '2022-01-19'
    }
];

const seedExercises = () => Exercise.bulkCreate(exercisedata, { individualHooks: true });

module.exports = seedExercises;
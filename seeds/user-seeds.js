const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [{
        first_name: 'Nia',
        last_name: 'Wong',
        username: 'nia123',
        email: 'nia123@gmail.com',
        password: 'password123'
    },
    {
        first_name: 'Andrew',
        last_name: 'Yu',
        username: 'andrewyu',
        email: 'andrewyu2654@gmail.com',
        password: '123456'
    },
    {
        first_name: 'John',
        last_name: 'Harris',
        username: 'johnc23',
        email: 'john.harris7292@gmail.com',
        password: '123456'
    }
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
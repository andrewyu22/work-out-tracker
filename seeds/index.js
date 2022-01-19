const seedUsers = require('./user-seeds');
const seedExercises = require('./exercise-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');
    await seedExercises();
    console.log('--------------');
    process.exit(0);

}

seedAll();
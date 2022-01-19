const User = require('./User');
const Exercise = require('./Exercise');

User.hasMany(Exercise, {
    foreignKey: 'user_id'
})

Exercise.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Exercise };
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Exercise extends Model {}

// create fields/columns for User model
Exercise.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise'
});

module.exports = Exercise;
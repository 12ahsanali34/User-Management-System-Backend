const db = require('../config/database');
const Sequelize = require('sequelize');

const Users = db.define('users',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull: true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type:Sequelize.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false
})

module.exports = Users;
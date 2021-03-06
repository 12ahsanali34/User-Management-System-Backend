const db = require('../config/database');
const Sequelize = require('sequelize');

const Contacts = db.define('contacts',{
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type:Sequelize.BIGINT,
        allowNull: false,
    },
    number:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    user_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    role:{
        type:Sequelize.INTEGER,
        allowNull: true,
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull: true,
    }
},{
    timestamps: false
})

module.exports = Contacts;
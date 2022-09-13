const { Sequelize } = require('../db/conn')
const db = require('../db/conn')

// models
const User = require('./User')

const Comment = db.sequelize.define('Comment', {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
        require: true
    }
})

Comment.belongsTo(User)
User.hasMany(Comment)

module.exports = Comment
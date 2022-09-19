const db = require('../db/conn')

const User = db.sequelize.define('User', {
    name: {
        type: db.Sequelize.STRING,
        require: true
    },
    email: {
        type: db.Sequelize.STRING,
        require: true
    },
    password: {
        type: db.Sequelize.STRING,
        require: true
    }
})

module.exports = User
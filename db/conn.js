const Sequelize = require('sequelize')

const sequelize = new Sequelize('freecomments', 'root', 'Well@134', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao MYSQL')
} catch (err) {
    console.log('Erro: '+err)
}

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
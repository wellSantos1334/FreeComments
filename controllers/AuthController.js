const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        // find user
        const user = await User.findOne({ where: { email: email }, raw: true })
        console.log(user)
        if (!user) {
            req.flash('message', 'User not found!')
            res.render('auth/login')

            return
        }

        // check if password match

        if (!(await bcrypt.compareSync(password, user.password))) {
            req.flash('message', 'Invalid pasword, not match')
            res.render('auth/login')

            return
        }

        // initialize session
        req.session.userid = user.id

        req.flash('message', 'Created user with success')

        req.session.save(() => {
            res.redirect('/')
        })

    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // password match validation
        if (password != confirmpassword) {
            req.flash('message', 'The password not match!')
            res.render('auth/register')

            return
        }

        // check if user exists
        const checkIfUserExist = await User.findOne({ where: { email: email } })
        if (checkIfUserExist) {
            req.flash('message', 'This e-mail already used!')
            res.render('auth/register')

            return
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name, email, password: hashedPassword,
        }

        try {
            const createdUser = await User.create(user)
            req.flash('message', 'User created with success')
            // initialize session
            req.session.userid = createdUser.id

            req.session.save(() => {
                res.redirect('/')
            })



        } catch (err) {
            console.log('Error: ' + err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}
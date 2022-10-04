const Comment = require('../models/Comment')
const User = require('../models/User')

module.exports = class CommentController {
    static async showComments(req, res) {
        res.render('comments/home')
    }

    static async dashboard(req, res) {
        const userId = req.session.userid
        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Comment,
            plain: true,
        })

        // check if user exist 
        if (!user) {
            res.redirect('/login')
        }

        const comments = user.Comments.map((result) => result.dataValues)

        res.render('comments/dashboard', { comments })
    }

    static newComment(req, res) {
        res.render('comments/new')
    }

    static async newCommentSave(req, res) {
        const comment = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Comment.create(comment)
            req.flash('message', 'Comment created with success')

            req.session.save(() => {
                res.redirect('/comments/dashboard')
            })
        } catch (err) {
            console.log(err)
        }

    }

    static async removeComment(req, res) {
        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Comment.destroy({ where: { id: id, Userid: UserId } })

            req.flash('message', 'Comment removed')

            req.session.save(() => {
                res.redirect('/comments/dashboard')
            })
        } catch (err) {
            console.log(err)
        }

    }
}
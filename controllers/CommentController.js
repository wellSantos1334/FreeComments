const Comment = require('../models/Comment')
const User = require('../models/User')

module.exports = class CommentController {
    static async showComments(req, res) {
        res.render('comments/home')
    }
}
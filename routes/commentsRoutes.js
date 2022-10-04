const express = require('express')
const router = express.Router()

// controller
const CommentController = require('../controllers/CommentController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', CommentController.showComments)
router.get('/dashboard', checkAuth, CommentController.dashboard)
router.get('/add', checkAuth, CommentController.newComment)
router.post('/add', checkAuth, CommentController.newCommentSave)
router.post('/remove', checkAuth, CommentController.removeComment)

module.exports = router
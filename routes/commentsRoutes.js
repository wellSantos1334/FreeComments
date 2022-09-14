const express = require('express')
const router = express.Router()

// controller
const CommentController = require('../controllers/CommentController')

router.get('/', CommentController.showComments)

module.exports = router
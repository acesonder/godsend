const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { readLimiter } = require('../middleware/rateLimiter');

// Get all published posts
router.get('/', readLimiter, postsController.getAllPosts);

// Get posts by type
router.get('/type/:type', readLimiter, postsController.getPostsByType);

// Get single post
router.get('/:id', readLimiter, postsController.getPost);

module.exports = router;

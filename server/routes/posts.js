const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Get all published posts
router.get('/', postsController.getAllPosts);

// Get posts by type
router.get('/type/:type', postsController.getPostsByType);

// Get single post
router.get('/:id', postsController.getPost);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
    '/post', 
    isAuth,
    [
        body('title', 'title is invalid')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5})
    ],
    feedController.createPost
);

router.get('/post/:postId', isAuth, feedController.getPostId);

router.put(
    '/post/:postId', 
    isAuth,
    [
        body('title', 'title is invalid')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5})
    ],
    feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

router.get('/status', isAuth, feedController.getStatus);

router.post(
    '/status', 
    isAuth,
    body('status')
        .trim()
        .isLength({min: 1}),
    feedController.postStatus
);

module.exports = router;
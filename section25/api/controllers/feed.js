const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({
        message: 'fetched posts',
        posts: posts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    })
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  console.log('err', errors);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, invalid post data.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title, 
    content: content,
    imageUrl: 'images/Protoss.png',
    creator: {
      name: 'max'
    }
  })
  post.save()
    .then(result => {
        // Create post in db
      res.status(201).json({
        message: 'Post created successfully!',
        post: { 
          _id: new Date().toISOString(), 
          title: title, 
          imageUrl: 'images/Protoss.png',
          content: content,
          creator: {
            name: "max",
          },
          createdAt: new Date()
        }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    })

};

exports.getPostId = (req, res, next) => {
  Post.findById(req.params.postId)
    .then(post => {
      if (!post) {
        const error = new Error("Could not find the post.");
        error.statusCode = 404;
        throw error;
      }
      return res
        .status(200)
        .json({
          message: "post fetched",
          post: post
        })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    })
}
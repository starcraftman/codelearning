const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ 
      _id: 1,
      title: 'First Post', 
      imageUrl: 'images/Protoss.png',
      content: 'This is the first post!',
      creator: {
        name: "max",
      },
      createdAt: new Date()
    }]
  });
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

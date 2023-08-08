const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user');

const clearImage = (filePath) => {
  filePath = path.join(path.dirname(path.dirname(__filename)), filePath);
  fs.unlink(filePath, err => console.log('clearImage', err));
}

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems = 0;
  Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post
        .find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(posts => {
      return res.status(200).json({
        message: 'fetched posts',
        posts: posts,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || !req.file) {
    if (req.file) {
      clearImage(req.file.path);
    }
    const error = new Error('Validation failed, invalid post data.');
    error.statusCode = 422;
    throw error;
  }
  
  let creator;
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path.replace('\\', '/');
  const post = new Post({
    title: title, 
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  })
  post.save()
    .then(result => {
      return User.findById(req.userId)
    })
    .then(user => {
      user.posts.push(post);
      creator = user;
      return user.save()
    })
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: post,
        creator: {
          _id: creator._id,
          name: creator.name
        }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
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
      console.log('post', post)
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
      }
      next(err);
    })
}

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const imageUrl = req.file ? req.file.path.replace('\\', '/') : req.body.image;
  const errors = validationResult(req);

  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, invalid post data.');
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then(post => {
      if (!post) {
          const error = new Error("Could not find the post.");
          error.statusCode = 404;
          throw error;
        }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized.");
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl != post.imageUrl) {
        clearImage(post.imageUrl);
      }

      post.title = req.body.title;
      post.content = req.body.content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then(result => {
      return res
        .status(200)
        .json({
          message: 'Post updated!',
          post: result
        })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.deletePost = (req, res, next) => {
  Post.findById(req.params.postId)
  .then(post => {
    if (!post) {
      const error = new Error("Could not find the post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized.");
      error.statusCode = 403;
      throw error;
    }
    
    clearImage(post.imageUrl);
    return Post.deleteOne({_id: post})
  })
  .then(result => {
    return User.findById(req.userId)
  })
  .then(user => {
    user.posts.pull(req.params.postId);
    return user.save();
  })
  .then(result => {
    res
      .status(200)
      .json({
        message: 'Deleted post!'
      })
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
}
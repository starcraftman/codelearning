const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user');
const user = require('../models/user');

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post
      .find()
      .populate('creator')
      .sort({createdAt: -1})
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      message: 'fetched posts',
      posts: posts,
      totalItems: totalItems
    });

  } catch(err)  {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty() || !req.file) {
      if (req.file) {
        clearImage(req.file.path);
      }
      const error = new Error('Validation failed, invalid post data.');
      error.statusCode = 422;
      throw error;
    }
    
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path.replace('\\', '/');
    const post = new Post({
      title: title, 
      content: content,
      imageUrl: imageUrl,
      creator: req.userId
    })
    
    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();
    
    // const postToSend = {
    //   ...post._doc,
    //   creator: {
    //     _id: user._id,
    //     name: user.name
    //   }
    // }
    // getIO().emit('posts', {
    //   action: 'create',
    //   post: postToSend
    // });

    return res
      .status(201)
      .json({
        message: 'Post created successfully!',
        post: postToSend,
        creator: {
          _id: user._id,
          name: user.name
        }
      });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPostId = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate('creator');
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

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }  
}

exports.updatePost = async (req, res, next) => {
  console.log('incoming body', req.body)
  const postId = req.params.postId;
  const imageUrl = req.file ? req.file.path.replace('\\', '/') : req.body.image;
  const errors = validationResult(req);
  
  try {
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

    const post = await Post.findById(postId).populate('creator');
    if (!post) {
      const error = new Error("Could not find the post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator._id.toString() !== req.userId) {
      const error = new Error("Not authorized.");
      error.statusCode = 403;
      throw error;
    }

    if (imageUrl !== 'undefined' && imageUrl != post.imageUrl) {
      clearImage(post.imageUrl);
      post.imageUrl = imageUrl;
    }

    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();

    // const postToSend = {
    //   ...post._doc,
    //   creator: {
    //     _id: post.creator._id,
    //     name: post.creator.name
    //   }
    // }
    // getIO().emit('posts', {
    //   action: 'update',
    //   post: postToSend
    // });

    return res
      .status(200)
      .json({
        message: 'Post updated!',
        post: postToSend
      })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }  
}

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
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
    await Post.deleteOne({_id: post})

    const user = await User.findById(req.userId);
    user.posts.pull(req.params.postId);
    await user.save();

    // getIO().emit('posts', {
    //   action: 'delete',
    //   post: {_id: req.params.postId}
    // });
    
    return res
      .status(200)
      .json({
        message: 'Deleted post!'
      })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }  
}

exports.getStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      status: user.status
    })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }  
}

exports.postStatus = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Invalid status sent.');
      error.statusCode = 422;
      throw error;
    }
  
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

    user.status = req.body.status;
    await user.save();

    return res
      .status(200)
      .json({
        message: "Updated user status.",
        status: user.status
      })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }  
}
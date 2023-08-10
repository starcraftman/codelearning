const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const vdr = require('validator');

const Post = require('../models/post');
const User = require('../models/user');
const getSecret = require('../util/get-secret');
const clearImage = require('../util/clear-image');

const JWT_SECRET = getSecret('jwt');
const PER_PAGE = 2;

/**
 * Cleans a single mongoose obj for return over graphql.
 * 
 * Returns: The mongoose obj's _doc, with string versions of _id, createdAt and updatedAt.
 */
const fixedMongooseObj = (mObj) => {
    const fixed = {
        ...mObj._doc,
        _id: mObj._id.toString(),
        createdAt: mObj.createdAt.toISOString(),
        updatedAt: mObj.updatedAt.toISOString()
    }

    if (fixed.hasOwnProperty('password')) {
        fixed.password = "[removed]";
    }

    return fixed;
}

module.exports = {
    login: async (args, req) => {
        const email = vdr.normalizeEmail(vdr.trim(args.email));
        const password = vdr.trim(args.password);
      
        const user = await User.findOne({email: email});
        if (!user) {
            const error = new Error("A user with email was not found.");
            error.code = 401;
            throw error;
        }
    
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Password incorrect.");
            error.code = 401;
            throw error;
        }
    
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        return { 
            token: token,
            userId: user._id.toString()
        }
    },

    createUser: async (args, req) => {
        const email = vdr.normalizeEmail(vdr.trim(args.userInput.email));
        const password = vdr.trim(args.userInput.password);
        const name = vdr.trim(args.userInput.name);
        const errors = [];
        console.log(args.userInput);

        if (!vdr.isEmail(email)) {
            errors.push({message: 'Email is invalid.'})
        }
        if (vdr.isEmpty(password) || !vdr.isLength(password, {min: 5})) {
            errors.push({message: 'Password too short.'})
        }
        if (errors.length > 0) {
            const error = new Error("Invalid arguments provided.");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            const error = new Error('User exists already!');
            throw error;
        }

        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
          name: name,
          password: hashedPw,
          email: email,
        })

        return fixedMongooseObj(await user.save());
    },

    createPost: async (args, req) => {
        console.log(req);
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        }

        const title = vdr.trim(args.input.title);
        const imageUrl = vdr.trim(args.input.imageUrl);
        const content = vdr.trim(args.input.content);
        const errors = [];

        if (vdr.isEmpty(title) || !vdr.isLength(title, {min: 5})) {
            errors.push({message: 'Title is invalid.'})
        }
        if (vdr.isEmpty(content) || !vdr.isLength(content, {min: 5})) {
            errors.push({message: 'Content is invalid.'})
        }
        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("Invalid user.");
            error.code = 401;
            throw error;
        }

        const post = new Post({
          title: title, 
          content: content,
          imageUrl: imageUrl,
          creator: user,
        })
        const createdPost = await post.save();
        user.posts.push(createdPost);
        await user.save();

        return fixedMongooseObj(createdPost);
    },

    deletePost: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        }
        const post = await Post.findById(args.postId);
        if (!post) {
            const error = new Error("No post found!");
            error.code = 404;
            throw error;
        }
        if (post.creator.toString()!== req.userId.toString()) {
            const error = new Error("Not authorized!");
            error.code = 403;
            throw error;
        }

        clearImage(post.imageUrl);
        await Post.deleteOne({_id: args.postId});
        const user = await User.findById({_id: req.userId});
        user.posts.pull(post._id);
        await user.save();

        return {message: "Post deleted."};
    },

    updatePost: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        } 

        const post = await Post.findById(args.postId).populate('creator');
        if (!post) {
            const error = new Error("No post found!");
            error.code = 404;
            throw error;
        }
        if (post.creator._id.toString()!== req.userId.toString()) {
            const error = new Error("Not authorized!");
            error.code = 403;
            throw error;
        }

        const title = vdr.trim(args.input.title);
        const imageUrl = vdr.trim(args.input.imageUrl);
        const content = vdr.trim(args.input.content);
        const errors = [];

        if (vdr.isEmpty(title) || !vdr.isLength(title, {min: 5})) {
            errors.push({message: 'Title is invalid.'})
        }
        if (vdr.isEmpty(content) || !vdr.isLength(content, {min: 5})) {
            errors.push({message: 'Content is invalid.'})
        }
        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        // Validated & authorized.
        post.title = title;
        post.content = content;
        if (imageUrl !== 'undefined') {
            post.imageUrl = imageUrl;
        }

        return fixedMongooseObj(await post.save());
    },


    getPosts: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        }

        const page = args.page || 1;
        const totalItems = await Post.find().countDocuments();
        const posts = await Post
            .find()
            .populate('creator')
            .skip((page - 1) * PER_PAGE)
            .limit(PER_PAGE)
            .sort({createdAt: -1});
    
        return {
            posts: posts.map(post => fixedMongooseObj(post)),
            totalItems: totalItems
        };
    },

    getPost: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        }
        if (!args.postId) {
            const error = new Error("A postId is required.");
            error.code = 422;
            throw error;
        }
       
        const post = await Post
            .findOne({_id: args.postId})
            .populate('creator');
        return fixedMongooseObj(post);
    },

    setStatus: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        }
        if (vdr.isEmpty(args.newStatus)) {
            const error = new Error("Invalid status sent, cannot be empty.");
            error.code = 422;
            throw error;
        }
       
        const user = await User.findOne({_id: req.userId});
        if (!user) {
            const error = new Error("User not found!");
            error.code = 404;
            throw error;
        }

        user.status = args.newStatus;
        await user.save();
        return fixedMongooseObj(user);
    },

    getUser: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        }
       
        const user = await User.findOne({_id: req.userId});
        if (!user) {
            const error = new Error("User not found!");
            error.code = 404;
            throw error;
        }

        return fixedMongooseObj(user);
    }
}
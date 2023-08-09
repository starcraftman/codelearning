const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const vdr = require('validator');

const Post = require('../models/post');
const User = require('../models/user');
const getSecret = require('../util/get-secret');
const post = require('../models/post');

const JWT_SECRET = getSecret('jwt');
const PER_PAGE = 2;

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
        const createdUser = await user.save();

        return {
            ...createdUser._doc,
            password: "",
            _id: createdUser._id.toString()
        }
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

        return {
            ...createdPost._doc,
            _id: createdPost._id.toString(),
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
        }
    },

    getPosts: async (args, req) => {
        if (!req.isAuth) {
            const error = new Error("Not authenticated!");
            error.code = 401;
            throw error;
        }

        const totalItems = await Post.find().countDocuments();
        const posts = await Post
            .find()
            .populate('creator')
            .sort({createdAt: -1});
    
        return {
            posts: posts.map(post => {
                return {
                    ...post._doc,
                    _id: post._id.toString(),
                    createdAt: post.createdAt.toISOString(),
                    updatedAt: post.updatedAt.toISOString()
                }
            }),
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
    
        return {
            ...post,
            _id: post._id.toString(),
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        };
    }
}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const vdr = require('validator');

const Post = require('../models/post');
const User = require('../models/user');
const getSecret = require('../util/get-secret');

const JWT_SECRET = getSecret('jwt');


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
    }
}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const vdr = require('validator');

const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
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
            console.log(errors);
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
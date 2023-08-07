exports.getPosts = (req, res, next) => {
    return res.status(200).json({
        posts: [{
            title: 'First Post', 
            content: 'This is the first post.'
        }]
    });
};

exports.postPosts = (req, res, next) => {
    const {title, content} = req.body;
    return res.status(201).json({
        message: 'Post created successfully.',
        post: {
            id: new Date().toISOString(),
            title: title,
            content: content
        }
    })
};
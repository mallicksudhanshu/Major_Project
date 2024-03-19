const Post=require('../models/post');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log('Post created successfully:', post);
        return res.redirect('back');
    } catch (err) {
        console.error('Error in creating a post:', err);
        return res.redirect('back'); // You might want to handle the error differently
    }
};

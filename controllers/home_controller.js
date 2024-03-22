const Post=require('../models/post');

module.exports.home = async function(req, res) {
    try {
        // fetch posts of signedIn user
        const posts = await Post.find().populate('user').exec();
        // console.log(posts);
        // render it in home page
        return res.render('home',{
            title:'Home',
            message:'Welcome to Home',
            posts:posts
        })
    } catch (err) {
        console.error('Error in creating a post:', err);
        return res.redirect('/users/SignIn');
    }
};
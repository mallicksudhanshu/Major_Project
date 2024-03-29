const Post=require('../models/post');
const User=require('../models/users');

module.exports.home = async function(req, res) {
    try {
        // fetch posts of signedIn user
        const posts = await Post.find().populate('user').populate({
            path:'comments',
            populate:{
                path:'user',
            }
        }).exec();

        const users= await User.find();
        // console.log(posts);
        // render it in home page
        return res.render('home',{
            title:'Home',
            message:'Welcome to Home',
            posts:posts,
            all_users:users
        })
    } catch (err) {
        console.error('Error in creating a post:', err);
        return res.redirect('/users/SignIn');
    }
};
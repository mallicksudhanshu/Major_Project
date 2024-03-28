const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        // find the post
        const post= await Post.findById(req.body.postId);
        if(!post){
            console.error('Post not found');
            return res.redirect('back');
        }
        // creaate the comment
        const comment=await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.postId
        });
        //  push the comments refrence to the post
        post.comments.push(comment._id)
        await post.save();

        console.log('Comment created sucessfully',comment);
        return res.redirect('/');

    }catch(err){
        console.error('Error in creating comment:', err);
        return res.redirect('back');
    }
}
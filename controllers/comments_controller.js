const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        const comment=await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post:req.body.postId
        });

        await Post.findByIdAndUpdate(req.body.postId,{ $push: { comments:comment._id } })
        console.log('Comment created sucessfully:',comment);
        return res.redirect('back');
    }catch(err){
        console.error('Error in creating comment:', err);
        return res.redirect('back');
    }
}
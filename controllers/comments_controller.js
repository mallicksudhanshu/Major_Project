const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        // find the post
        const post= await Post.findById(req.body.postId);
        if(!post){
            req.flash('error', 'Post not found');
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

        req.flash('success', 'Comment created successfully');
        return res.redirect('/');

    }catch(err){
        req.flash('error', 'Failed to create comment');
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try {

        const comment= await Comment.findById(req.params.id);
        if(!comment){
            console.log("No comment available by this user");
        }else{
            // .id means converting the object id into string
            if(comment.user.toString()==req.user.id){

                let postId = comment.post

                await comment.deleteOne()
                await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});
                req.flash('success', 'Comment deleted successfully');
                return res.redirect('/');

            }else {
                req.flash('error', 'You are not authorized to delete this comment');
                return res.redirect('back');
            }
        }
        
    } catch (error) {
        req.flash('error', 'Failed to delete comment');
        return res.redirect('back');
    }
}
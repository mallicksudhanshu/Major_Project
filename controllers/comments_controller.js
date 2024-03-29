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
                console.log('Comment deleted Sucessfully');

                await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});
                console.log('Comment refrence from posts deleted sucessfully');
                return res.redirect('/');

            }else {
                console.log("You are not authorized to delete this comment");
                return res.redirect('back');
            }
        }
        
    } catch (error) {
        console.error('Error in deleting the comment:', err);
        return res.redirect('back');
    }
}
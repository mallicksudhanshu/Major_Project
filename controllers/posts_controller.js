const Post=require('../models/post');
const Comment=require('../models/comment');

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


module.exports.destroy = async function(req,res){
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            console.log("No posts available by this user")
        }else{
            // .id means converting the object id into string 
            if(post.user.toString()==req.user.id){
                await post.deleteOne()
                console.log("Post deleted successfully");

                 // Delete comments associated with the post
                 await Comment.deleteMany({ post: req.params.id });
                 console.log("Comments deleted successfully");

                 return res.redirect('/');

            }else {
                console.log("You are not authorized to delete this post");
            }
        }
    }catch (err) {
        console.error('Error in deleting the post:', err);
        return res.redirect('back');
    }
}


const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post created successfully');
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
            req.flash('error','No post found');
            return res.redirect('back');
        }else{
            // .id means converting the object id into string 
            if(post.user.toString()==req.user.id){
                await post.deleteOne()
                // Delete comments associated with the post
                await Comment.deleteMany({ post: req.params.id });
                req.flash('success', 'Post and associated comments deleted successfully');

                return res.redirect('/');

            }else {
                req.flash('error', 'You are not authorized to delete this post');
                return res.redirect('back');
            }
        }
    }catch (err) {
        console.error('Error in deleting the post:', err);
        req.flash('error', 'Error deleting post');
        return res.redirect('back');
    }
}
 

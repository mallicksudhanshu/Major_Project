module.exports.profile = function(req, res){
    res.render('user_profile',{
        title:'User Page',
        user_message:'Welcome to User Page'
    });
}
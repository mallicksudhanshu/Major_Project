module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title:'User Page',
        user_message:'Welcome to User Page'
    });
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
}


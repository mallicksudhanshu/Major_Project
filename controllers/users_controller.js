// const {Session} = require('inspector');
const User= require('../models/users');

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title:'User Page',
        user_message:'Welcome to User Page'
    });
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
}

module.exports.create = async function(req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/signIn');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in user creation:', err);
        return res.status(500).send('Internal Server Error');
    }
};


module.exports.createSession=function(req,res){
    return res.redirect('/');
}
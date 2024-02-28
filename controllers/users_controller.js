const User= require('../models/users');
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


module.exports.createSession = async function(req, res) {
    try {
        // Find the user
        const user = await User.findOne({ email: req.body.email });

        // Handle user found
        if (user) {
            // Handle password mismatch
            if (user.password !== req.body.password) {
                return res.redirect('back');
            }

            // Handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            // Handle user not found
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in user sign-in:', err);
        return res.status(500).send('Internal Server Error');
    }
};

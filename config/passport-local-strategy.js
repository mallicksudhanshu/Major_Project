const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users');

//passport local authentication implementation 
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async function(email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (!user) { 
            console.log('Invalid Username');
            return done(null, false);
        }

        if (user.password != password) { 
            console.log('Invalid Password');
            return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
      }
    }
  )
);



// serializing the user which key used for cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// decerializing the user from the key in cookies
passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
  
      // Successful deserialization, return the user object
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  });

  // check if the user is authenticated
  passport.checkAuthentication=function(req,res,next){
    // if the user is signed in, then pass on the request 
    //  to the next function(controller's action)
    if (req.isAuthenticated()){
      return next();
    }
    // if user is not signed in
    return res.redirect('/users/SignIn');
  }

  passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
      // req.user contains the current signed in user from session cookie
      // sending it to the locals for the views
      res.locals.user=req.user;
    }
    next();
  }
  

module.exports = passport;

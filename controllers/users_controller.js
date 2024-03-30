// const {Session} = require('inspector');
const User = require("../models/users");

module.exports.profile = async function (req, res) {
  try {
    const user=await User.findById(req.params.id)
    return res.render("user_profile", {
      title: "User Page",
      user_message: "Welcome to User Page",
      profile_user:user
    });
    
  } catch (error) {
    console.error(error);
  }
  
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/signIn");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error in user creation:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error("Error during logout:", err);
      return res.redirect("/");
    }
    return res.redirect("/");
  });
};

module.exports.update = async function(req, res) {
  try {
      // Check if the authenticated user is authorized to update the user details
      if (req.user.id !== req.params.id) {
          return res.status(401).send('Unauthorized update');
      }

      // Update the user details
      await User.findByIdAndUpdate(req.params.id, req.body);

      console.log('User details updated successfully');
      return res.redirect('back');
  } catch (error) {
      console.error('Error updating user details:', error);
  }
}

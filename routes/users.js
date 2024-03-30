const express = require('express');
const router = express.Router();
const passport=require('passport');

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usersConrtoller.profile);
router.post('/update/:id',passport.checkAuthentication,usersConrtoller.update);


router.get('/SignUp',usersConrtoller.signUp);
router.get('/SignIn',usersConrtoller.signIn);

router.post('/create',usersConrtoller.create);

// authenticating user after sigining in using passport
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/SignIn'},
),usersConrtoller.createSession);

router.get('/SignOut',usersConrtoller.destroySession);


module.exports = router;


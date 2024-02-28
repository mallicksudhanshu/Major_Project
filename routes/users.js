const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');
const photoesController=require('../controllers/photoes_controller')

router.get('/profile', usersConrtoller.profile);
router.get('/photoes',photoesController.photoes);

router.get('/SignUp',usersConrtoller.signUp);
router.get('/SignIn',usersConrtoller.signIn);


module.exports = router;






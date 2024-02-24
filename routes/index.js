const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.get('/home',function(req,res){
    return res.end('<h1>Express is up for Nodeial.</h1>')
});
// console.log('Router loaded');
module.exports=router;
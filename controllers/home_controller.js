module.exports.home = function(req, res){
    res.cookie('user_id',23)
    return res.render('home',{
        title:'Home',
        message:'Welcome to Home'
    })
}
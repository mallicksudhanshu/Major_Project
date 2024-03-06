module.exports.home = function(req, res){
    return res.render('home',{
        title:'Home',
        message:'Welcome to Home'
    })
}
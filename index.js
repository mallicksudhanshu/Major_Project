const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});
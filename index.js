const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose.js');

// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy.js');

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// use express router 
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});
const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

//extract style and scripts from suubpages into the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');  //folder from which to accesss views

app.use(session({
    name:'codeial',
    secret:'blahsomething',//to change secret before deployment in production mode
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err)
    {
        //console.log('error in running the server',error);   //without interpolation
        console.log(`error in running the server: ${err}`);
    }
    else
    {
        console.log(`server is running on port : ${port}`);
    }
});
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
//const MongoStore = require('connect-mongo');
//import connectMongo from 'connect-mongo';
const MongoStore=require('connect-mongo')(session);

const sassMiddleware=require('node-sass');  //app crashing

/*
app.use(sassMiddleware({
    src:'/assets/scss'
}));
*/

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

//extract style and scripts from suubpages into the layout
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');  //folder from which to accesss views

app.use(session({
    name:'codeial',
    secret:'blahsomething',//to change secret before deployment in production mode
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
    {
        mongooseConnection:db,
        autoRemove:'disabled'

    },
    function(err){
        console.log(err || "connect mongo db setup ok");
    }
    )
    
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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
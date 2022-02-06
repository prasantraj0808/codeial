const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

//extract style and scripts from suubpages into the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes/index.js'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');  //folder from which to accesss views

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
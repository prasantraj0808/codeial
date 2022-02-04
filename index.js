const express=require('express');

const app=express();
const port=8000;

//use express router
app.use('/',require('./routes/index.js'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

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
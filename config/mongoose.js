const mongoose=require('mongoose');   //require the library
mongoose.connect('mongodb://localhost/contact_list_db');  //connect to the database

const db = mongoose.connection;   //acquire the connection (to check if it is successful)

db.on('error',console.error.bind(console,'error connecting to db'));  //error

db.once('open',function(){
    console.log('successfully connected to the database');
});   //up and running then print the message
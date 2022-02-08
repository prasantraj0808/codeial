const User=require('../models/user');

module.exports.profile=function(req,res){
    res.end('<h1>user profile</h1>')
};

//render signup page

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"codeial| sign up"
    });

};
//render sign in page

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"codeial| sign in"
    });

};
//get the signup data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('error in finding the user in signing up');
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log('error in creating userwhile signing up');
                    return;
                }
                return res.redirect('/users/sign-in');


            });
        }
        else
        {
            console.log('user is already present');
            return res.redirect('back');
        }

    });
};

//sigin and create the session for the usser
module.exports.createSession=function(req,res){
    return res.redirect('/');
};


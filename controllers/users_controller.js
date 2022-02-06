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
    //to do later
};

//sigin and create the session for the usser
module.exports.createSession=function(req,res){
    //to do later
};


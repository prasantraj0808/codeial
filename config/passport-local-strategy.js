const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');
//const User=require('../models/user');

//authentication using passport

passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find the user and establish identity
        User.findOne({email:email},function(err,user){
            if(err)
            {
                console.log('error in finding the user---->passport');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('invalid user name/password');
                return done(null,false);
            }

            return done(null,user);

        });
    }
));

//serialising the user to decide which key is to be kept in cookies(sending key from server to the browser)
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialising the user from the key in the cookies(when user is signed in and browser makes request to the server)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user --->passport');
            return done(err);
        }
        return done(null,user);
    });
});

//check if the user is authentiacted

passport.checkAuthentication=function(req,res,next){
    //if the user is signed in ,then pass on the request to the next function (controller action)

    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookis and we are just sending to the locals for views

        res.locals.user=req.user;
    }

    next();
}

module.exports= passport;
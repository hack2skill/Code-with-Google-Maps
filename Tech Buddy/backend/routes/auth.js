const express=require('express');
const app=express.Router();
var session = require('express-session')
const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User=require('../models/userModel');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // console.log(user)
        return done(null, user);
      });
  }
));
passport.serializeUser(function (user, cb) {
    // console.log(user)
      return cb(null, user);
    });
  
  passport.deserializeUser(function (user, cb) {
      return cb(null, user);
    });
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'profile',"email" ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/success',(req,res)=>{
    if(req.isAuthenticated()){
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: req.user,
      });
    }
    else{
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
})
app.get('/auth/google/failure',(req,res)=>{
  res.status(401).json({
		error: true,
		message: "Log in failure",
	});
})
app.get("/logout", (req, res) => {
	req.logout();
  //FrontEnd ka url
	// res.redirect(process.env.CLIENT_URL);
});



module.exports=app
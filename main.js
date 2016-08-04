var express = require('express');
var fs = require('fs');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser') 
var app = express();
var ID = "0";

app.use(cookieParser())
app.use('/static',express.static(__dirname));


passport.use(new FacebookStrategy({
    clientID: 1742952685970599,
    clientSecret: "2c03c040c02e08e665b9c4d506df66f8",
    callbackURL: "http://localhost:8088/auth/facebook/callback",
    passReqToCallBack: true
  },
  function(accessToken, refreshToken, profile, done) {
  	// console.log(JSON.stringify(profile));
  	ID = profile.id;
  	console.log(ID);
   //  User.findOrCreate(function(err, user) {
	  // if (err) { return done(err); }
   //    done(null, user);
   //  });
	done(null);
  }
));


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' }));

app.get('/', function(req, res) {
	if(ID!="0"){
		console.log("Login!");
		res.send(fs.readFileSync('./index2.html', 'UTF-8'));
	}
	else{
		console.log("not Login!");
		res.send(fs.readFileSync('./index.html', 'UTF-8'));
	}
});

app.listen("8088");
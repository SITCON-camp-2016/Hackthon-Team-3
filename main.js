var express = require('express');
var request = require('request');
var fs = require('fs');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser'); 
var app = express();
var ID = "0";
var cheerio = require('cheerio');
var readlineSync = require('readline-sync');



app.use(cookieParser());
app.use('/static',express.static(__dirname+'/static'));

//my ID : 1388002237882339

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
     // User.findOrCreate({ facebookId:profile.id }, function(err, user) {
	 // if(err) { return done(err); }
        // done(null, user);
   	 // });
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
app.post('/append/:code', function(req, res) {
	console.log("appendFile");
	fs.appendFile(__dirname + '/static/Receipt', req.params.code + '\n' ,'UTF-8', function(err){
		if(err){
			console.log("Append fail!");
		}
	})
})

app.post('/parse', function(req, res) {
	var code_arr = [];
	var my_code = [];
	request('http://invoice.etax.nat.gov.tw/', function (error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			$(".t18Red").each(function(i, element) {
				// console.log($(element).text());
				code_arr.push($(element).text());
				res = []; 
				res.push(i.textContent);
			});                                                                                                               
			// console.log($($("h2")['1']).text());
			// console.log($($("h2")['3']).text());
		}
		console.log("#############");
			//讀取發票記錄檔
			var lineReader = require('readline').createInterface({
				input: fs.createReadStream(__dirname + '/static/Receipt')
			});
			console.log("!!!!!!!!!");
			lineReader.on('line', function (line) {
				console.log('Line from file:', line);
				my_code.push(line);
				console.log("my_code 宣告");
			}).on('close', () => {
				console.log(code_arr.length);
				for(var i=0;i<code_arr.length;i++){
					console.log(i, code_arr[i]);
				}

				console.log("特獎 : " + code_arr[0]);
				console.log(my_code.length);
				//對特獎
				for(var i = 0; i<my_code.length ;i++){
					console.log("my_code = " + my_code[i]);
					if(parseInt(my_code[i]) == parseInt(code_arr[0])){   
						console.log("中特獎！");
					}
				}
			});
			
			// console.log("?????????");
			// while(my_code.length<2){
			// 	console.log("size=" + my_code.length);
			// }
			// console.log("AAAAAAAAA");

			

		});
		
})


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
// var fs = require('fs');


$('#pro').on('submit', function(){
	console.log("text.js");
	$.ajax({
  	url: './test',
    data: $('#pro').serialize(),
    type: 'GET'
  })
  .done(function(data){
  	$('div.a').html(JSON.stringify(data.args))
  })
	return false;
})






// $('#snd').on('click', function(){
// 	fs.writeFile('Receipt',$('#pro').val(),'utf8', function(err){
// 		if(!err){
// 			console.log("Success!");
// 		}
// 	})
// })
$('#pro').on('submit', function(){
	$.ajax({
  	url: 'https://httpbin.org/get',
    data: $('#pro').serialize(),
    type: 'GET'
  })
  .done(function(data){
  	$('div.a').html(JSON.stringify(data.args))
  })
	return false;
})
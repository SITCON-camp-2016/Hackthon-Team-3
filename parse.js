var request = require('request');
var cheerio = require('cheerio');

request('http://invoice.etax.nat.gov.tw/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    $(".t18Red").each(function(i, element) {
      console.log($(element).text());
      res = []; 
      res.push(i.textContent);
    }); 
                                                                                                                                                      
    console.log($($("h2")['1']).text());
    console.log($($("h2")['3']).text());
  }
});
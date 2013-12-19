var http = require('http');
var request = require('request');
//var cheerio = require('cheerio');
var url = require('url');
var querystring = require('querystring');
 
 function createFeed1(html) {
   var $ = require('cheerio').load(html, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
  // var traffic = $('html.no-maps-mini body.kui div#main.cs div#inner div#page div div#panel.panel-width div#spsizer.cs div div#opanel4.opanel div#panel4.subpanel div#panel_dir.dir div#dir_altroutes.noprint ol#dir_altroutes_body.dir-altroute-mult li#altroute_0.dir-altroute div.dir-altroute-inner div.altroute-aux span').text() ;
     var traffic = $('div.altroute-aux span').text() ;
    traffic = traffic.replace('Dans les conditions actuelles de circulation', '');
    traffic = traffic.replace(':', '');
    traffic = traffic.replace('min', ''); 
    traffic = traffic.replace(' heures ', ':'); 
    traffic = traffic.replace(' heure ', ':'); 
    traffic = traffic.substring(2,6);
    traffic = traffic.replace('D', ''); 
  //traffic1 = html;
 //console.log(traffic);
 return traffic; 
}
 
http.createServer(function (req, res) {
  var params = querystring.parse(url.parse(req.url).query);
  var serverRes = res; 
  //var url1 = 'http://maps.google.fr/maps?saddr=Rue+Maurice+Schumann,+Nimes&daddr=3+Rue+de+Massacan,+Vendargues';  
  var url1 = 'http://maps.google.fr/maps?saddr='+params['prenom']+'&daddr=' + params['nom']; 
  request(url1, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      serverRes.writeHead(200, {'Content-Type': 'text/tml"'});
      
      serverRes.end(createFeed1(body));
    }
  });
}).listen(process.env.PORT || 8080);
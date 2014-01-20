var request = require("request");

var imCache = {};

exports.vindex = function(req, res) {
    res.render('index.jade', { title: ''});
};

exports.getRestComposers = function(req, res) {
    console.log("getRestComposers");
    if (imCache.lastBody === undefined) {
		request("http://www.kimonolabs.com/api/3xmo6u48?apikey=6ad54b5425a5c7467120d15ac9066945", function(err, response, body) {
			//console.log("first body: "+body);
			imCache.lastBody = body;
			res.send(imCache.lastBody);
		});
	} else {
		//console.log("cache body: "+imCache.lastBody);
		res.send(imCache.lastBody);
	}
};
exports.getRestRecordings = function(req, res) {
	var composerUname = req.params.composer;
    console.log("getRestRecordings: "+composerUname);
	var rString = "http://www.kimonolabs.com/api/5xzemv3c?apikey=6ad54b5425a5c7467120d15ac9066945&title=Category:"+composerUname+"&intersect=Recordings";
	console.log("gRR: "+rString);
	request(rString, function(err, response, body) {
		console.log("first recs: "+body);
		res.send(body);
	});
};




// // http /rest/Composers
// exports.restGetComposers = function(req, res) {
//     console.log("restGetComposers");
//     res.send( '[ {"name": "Albinoni, Tomaso", "url":"Albinoni,_Tomaso"}, {"name": "Johann Sebastian Bach", "url":"Bach,_Johann_Sebastian"} ]' );
// };

// // http /rest/Works/:composer
// exports.restGetWorks = function(req, res) {
//     var c = req.param('composer');
//     console.log("restGetWorks("+c+")");
//     res.send( '[ {"name":"a.mp3","text":"'+c+'"}, {"name":"z.mp3","text":"bar"} ]' );
// };



// //http://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request
// var http = require('http');
// var cheerio = require("cheerio");

// var options = {
//   host: 'imslp.org',
//   path: '/wiki/Category:Albinoni,_Tomaso'
// };

// var callback = function(response) {
//   var str = '';

//   response.on('data', function (chunk) {
//     str += chunk;
//   });

//   response.on('end', function () {
//     //console.log(str);
//     console.log("imslp http end");
//     var cDom = cheerio.load(str);
//     var x = cDom("mw-pages").find("li");
//     var y = x[2];
//     var z = y.children[0].attribs;  // children undefined !!
//     // z.href / .title
//     console.log("z title", z.title);
//   });
// }

// // http POST /Index
// exports.Index = function(req, res) {
//     console.log("starting index");
//     http.request(options, callback).end();
//     console.log("ending index");
// };
// cheerio.load();
// $("mw-pages").find("li")
// x = "
// y = x[2]
// y.children[0].attribs.href / .title
// 
// get the div id="mw-pages"
// only the first one
// get all the li elements - that's it.
//<div id="mw-pages">
//<h2>Compositions by: Albinoni, Tomaso</h2>
//<p>The following 29 pages are in this category, out of 29 total.  </p>
//	<div lang="en" dir="ltr" class="mw-content-ltr">
//	<table width="100%">
//	<tr valign="top">
//	<td><h3>A</h3>
//<ul><li><span class="redirect-in-category">Adagio in G minor (Albinoni, Tomaso)</span></li></ul><h3>B</h3>
//<ul><li>Balletti a cinque (Albinoni, Tomaso)</li>
//<li>12 Balletti C  tre, Op.3 (Albinoni, Tomaso)</li></ul><h3>C</h3>

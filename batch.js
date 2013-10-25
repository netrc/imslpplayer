

var http = require('http');
var path = require('path');

console.log("I'm just a little batch program");
var cheerio = require("cheerio");




var getWorksCallback = function(response) {
  var getWorksStr = '';
  response.on('data', function (chunk) {
    getWorksStr += chunk;
  });
  response.on('end', function () {
    console.log("getWorks http end: got stuff: ", getWorksStr.substr(0,30));
    var cDom = cheerio.load(getWorksStr);
    var x = cDom("#mw-pages").find("li");
    //console.log("x:",x)
    //var y = x[2];
    //console.log("y:",y);
    //var z = y.children[0].attribs;
    //console.log("z",z);
    x.each(function(i,y){
       var z = y.children[0].attribs;
       if (z.title) {
           console.log("z: title",z.title, " href",z.href);
           http.request(getMP3sOptions(z.href), getMP3sCallback).end();
       }
    });
  });
};

var getMP3sCallback = function(response) {
  var getMP3sStr = '';
  response.on('data', function (chunk) {
    getMP3sStr += chunk;
  });
  response.on('end', function () {
    console.log("getMP3s http end: got stuff: ", getMP3sStr.substr(76,30));
    var mDom = cheerio.load(getMP3sStr);
    var mx = mDom("#tab1");
    if (mx.length === 0) {
        return;
    }
    console.log("getMP3s: got a tab1", mx);
    //console.log("x:",x)
    //var y = x[2];
    //console.log("y:",y);
    //var z = y.children[0].attribs;
    //console.log("z",z);
    //x.each(function(i,y){
       //var z = y.children[0].attribs;
       //if (z.title) {
           //console.log("z: title",z.title, " href",z.href);
       //}
    //});
  });
};

var imslpHost = "imslp.org";

function getWorksOptions( composer ) {
    return {
        host: imslpHost,
        path: '/index.php?title=Category:' + composer + '&intersect=Recordings'
        //  path: '/wiki/Category:Albinoni,_Tomaso'
        //Albinoni,_Tomaso
    };
}
function getMP3sOptions( workHref ) {
    return {
        host: imslpHost,
        path: workHref
        //http://imslp.org/wiki/Concerto_in_D_major,_T.Mi_3_(Albinoni,_Tomaso)
    };
}

console.log("starting index");
http.request(getWorksOptions('Albinoni,_Tomaso'), getWorksCallback).end();
console.log("ending index");

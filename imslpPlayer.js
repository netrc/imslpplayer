console.log('starting');
var express = require('express');
require('jade');
var vroutes = require('./vroutes');

var app = express();

app.configure(function(){
  app.use(express.static(__dirname + '/static'));
});

app.get('/', vroutes.vindex);
app.get('/rest/Composers', vroutes.getRestComposers);
app.get('/rest/Recordings/:composer?', vroutes.getRestRecordings);


app.listen(process.env.PORT);
console.log('listening on '+ process.env.PORT);

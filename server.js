var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

var logFmt = require("logfmt");

app.use(express.static(__dirname + '/client')); 

app.use(bodyParser.json());  

app.set('port', process.env.PORT || 3000);


app.all('/proxy', function(req, res) { 
    
    var url = req.header('SalesforceProxy-Endpoint');  
    request({ url: url, method: req.method, json: req.body, 
                    headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'}, body:req.body }).pipe(res);
     
    
});
 
app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} ); 
app.get('/index*' , function(req,res) {
    res.sendfile('views/index.html');
} );  
app.get('/landing*' , function(req,res) {
    res.sendfile('views/landingPage.html');
} ); 
app.get('/oauthcallback.html' , function(req,res) {
    res.sendfile('views/oauthcallback.html');
} ); 
app.get('/Main' , function(req,res) {
    res.sendfile('views/Main.html');
} );
app.get('/Play*' , function(req,res) {
    res.sendfile('views/PlayGround.html');
} );
 

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
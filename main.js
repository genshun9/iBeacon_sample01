var express = require('express');
var fs = require('fs');
var qs = require('qs');
var rl = require('readline');
var request = require('request');
Bleacon = require('bleacon');
var app = express();

app.use(require('body-parser')());

app.route('/')
  .get(function (req, res) {
    var html = fs.readFileSync('button.html', {encoding: 'utf-8'});
    html = html.replace('{{message}}', '');
    res.set('Content-Type', 'text/html');
    res.send(html);
  })
  .post(function (req, res) {
    var html = fs.readFileSync('button.html', {encoding: 'utf-8'});
    var uuid = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    Bleacon.startScanning(uuid);

    Bleacon.on('discover', function(bleacon) {
       console.dir(bleacon);
    });
    // html = html.replace('{{message}}', '<button>あざっす</button>');
    res.send(html);
  });

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

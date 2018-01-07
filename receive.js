Bleacon = require('bleacon');
Bleacon.startScanning();
Bleacon.on('discover', function(bleacon) {
    var beacon = JSON.parse(JSON.stringify(bleacon));

    // ipアドレス
    var ip = 'XX.XX.XX.XX';
    var reqParam = '/sa?uu=' + beacon.uuid + '&';
    reqParam += 'mj=' + beacon.major + '&';
    reqParam += 'mn=' + beacon.minor + '&';
    reqParam += 'px=' + beacon.proximity + '&';
    reqParam += 'id=1'

    var http = require('http');
    var options = {
      hostname: ip,
      port: 9000,
      path: reqParam,
      method: 'GET'
    };
    console.log(options);

    var req = http.request(options, function(res) {
      var body = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      });

      //res.on('end', function() {
        // ret = JSON.parse(body);
        //console.log(ret.name);
      //});
    });

    req.on('error', function(e) {
      console.log(e.message);
    });
    req.end();

});

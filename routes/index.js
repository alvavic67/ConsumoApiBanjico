var express = require('express');
var router = express.Router();
var request = require('request');

var options = {
  url: 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF63528/datos/',
  headers: {
    'Bmx-Token': 'becbb12bff88cba71f14d3677c4c8ed9f981662970ceb0739475d3a800888533'
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/apiBanxico', function(req, res, next) {

  var dato  =  req.body.txtDate;

  /*request.get('https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF63528/datos/'+dato+'/'+dato, {
  'auth': {
    'Bmx-Token': 'becbb12bff88cba71f14d3677c4c8ed9f981662970ceb0739475d3a800888533'
  }
});*/
  
  console.log(options.url+dato+"/"+dato);
  console.log(options.headers);
  request.get({url:options.url+dato+"/"+dato, oauth:options.headers}, function (e, r, body) {
    console.log(body);
  });
});

module.exports = router;

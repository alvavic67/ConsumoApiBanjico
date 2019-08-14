var express = require('express');
var router = express.Router();
var request = require('request');
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/apiBanxico', async function(req, res, next) {
  var dat  =  req.body.txtDate;

  var instance = {
    baseURL: 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF63528/datos/' + dat + '/' + dat,
    timeout: 180000,
    method:'GET',
    headers: {'Bmx-Token': 'becbb12bff88cba71f14d3677c4c8ed9f981662970ceb0739475d3a800888533'}
  };

  let response = await axios(instance);
  if(response.data.bmx.series[0].datos != null){
  var resp = response.data.bmx.series[0].datos[0].dato;
  console.log(resp);
  res.send(resp);
  }else{
    res.send("El dato de esta fecha no existe, intente de nuevo");
    //return;
  }
});

module.exports = router;

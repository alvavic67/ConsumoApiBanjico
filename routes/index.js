var express = require('express');
var router = express.Router();
var request = require('request');
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/apiBanxico', async function(req, res, next) {
  var dat  =  req.body.txtDate;
  if(dat === ""){
    res.render('consulta', { title: "¿?" })
    //res.end();
  }

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
  //res.send(resp);
  //res.write('<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><title>ConsumoApi</title></head><body><center><h1>Pagina de conversion de moneda por fecha</h1></center><h3>El tipo de cambio de la fecha '+ dat +' es de un dolar a '+ resp +' pesos</h3><input type="submit" onclick="window.location.href="'+ urlIndex +'";" class="btn btn-primary btn-lg" id="btnReturn" value="Nueva consulta"></input><script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script></body></html>');
  res.render('consulta', { title: resp });
  /*res.render('../views/consulta.html', function(err, html){
    document.write(html);
    console.log('si paso!');
  });*/
  }else{
    //res.send("No hay")
    //res.render('error.html');
    //res.write('<html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, shrink-to-fit=no\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\"><title>ConsumoApi</title></head><body><center><h1>Pagina de conversion de moneda por fecha</h1></center><h3>El tipo de cambio de la fecha '+ dat +' no se puede consultar en esta fecha</h3><input type=\"submit\" onclick=\"window.location.href=\"index.html\";\" class=\"btn btn-primary btn-lg\" id=\"btnReturn\" value=\"Nueva consulta\"></input><script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\" integrity=\"sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1\" crossorigin=\"anonymous\"></script><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script></body></html>');
    res.render('consulta', { title: "¿?" });
    //res.end();
  }
});

module.exports = router;
var http = require('http');

var Model = require('./model');

var Controller = {
	create: function(req, res){
		var dados = {
  		  name: 'Skol',
  		  description: 'Mijo de rato',
  		  alcohol: 4.5,
  		  price: 3.0,
  		  category: 'pilsen'
  		}
  		, model = new Model(dados)
  		, msg = ''
  		;

  		var model = new Model(dados);

  		model.save(function (err, data){
  		  if (err){
  		    console.log('Erro: ', err);
  		    msg = 'Erro: ' + err;
  		  }else{
  		    console.log('Cerveja inserida: ', data);
  		    msg = 'Cerveja Inserida: ' + data;
  		  }
  			res.end(msg);
  		});
	},
	update: function(req, res){
    var query = {name: '/skol/i'};

		  var mod = {
  			name: 'Brahma',
  			alcohol: 4,
  			price: 6,
  			category: 'pilsen'
  		};

  		var optional = {
  			upsert: false,
  			multi: false
  		};

  		Model.update(query, mod, function (err, data){
  			if(err){
  				console.log('Erro: ', err);
  		    msg = 'Erro: ' + err;
  			}else{
  				console.log('Cervejas atualizadas com sucesso: ', data);
  		    msg = 'Cervejas atualizadas com sucesso: ' + data.nModified;

  			}
  			res.end(msg);
  		});
	},
	retrieve: function(req, res){
		var query = {};

		Model.find(query, function(err, data){
		  if (err){
		    console.log('Erro: ', err);
		    msg = 'Erro: ' + err;
		  }
		  else {
		    console.log('Listagem: ', data);
		    msg = 'Listagem: ' + data;
		  }
		  res.end(msg);
		});
	},
	delete: function(req, res){
		var query = {name: /Brahma/i };

		// É multi: true CUIDADO!
		Model.remove(query, function(err, data){
			if(err){
				console.log(err);
		    msg = 'Erro: ' + err;
			}else{
				console.log('Cerveja deletada com sucesso, quantidade: ', data.result);
				msg = 'Cerveja deletada com sucesso, quantidade: ' + data;
			}
			res.end(msg);
		});
	}
}

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});

  var url = req.url, msg = '';

  switch(url){
  	case '/api/beers/create':
  		Controller.create(req, res);
  		break;
  	case '/api/beers/update':
  		Controller.update(req, res);
  		break;
  	case '/api/beers/retrieve':
  		Controller.retrieve(req, res);
  		break;
  	case '/api/beers/delete':
  		Controller.delete(req, res);
  		break;
  	default:
  		res.end('Rota não encontrada');
  		break;
  }
}).listen(3000);

console.log('Server running at http://localhost:3000/');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
});

app.get('/todos/:id', function (req, res) {
	// res.send('Asking for todo with id of ' + req.params.id);
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach(function (todo) {
		if (todoID === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	};

	// for (var l_id = 0; l_id < todos.length; l_id++) {
	// 	if (todoID === todos[l_id].id) {
	// 		matchedTodo = l_id;
	// 	};
	// };

	// if (typeof matchedTodo !== 'undefined') {
	// 	res.json(todos[matchedTodo]);
	// } else {
	// 	res.status(404).send();
	// };

});

app.post('/todos', function (req, res) {
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	console.log('description: ' + body.description);
	res.json(body);
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});


var bodyparser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds159344.mlab.com:59344/todolist');

var todoSchema = new  mongoose.Schema({
		text : String
});

var Todo = mongoose.model('todos', todoSchema);
// var todoOne = Todo({text : "Buy flowers"}).save(function(err){
// 	if (err) throw err;
// 	console.log("Item saved");
// });

var urlencodedParser = bodyparser.urlencoded({extended:"false"});

// var data = [{ text : "Buy Food"},{text : "do something"}];

module.exports = function(app){

	app.get('/todo', function(req,res){

		Todo.find({},function(err,data){
			if (err) throw err;
			res.render('todo',{todos: data});
		});

	});

	app.post('/todo', urlencodedParser ,function(req,res){

		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});

	});

	app.delete('/todo/:item', function(req,res){

		Todo.find({text : req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if(err) throw err;
			res.json(data);
		});

	});

};

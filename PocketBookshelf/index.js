//imports are done for you
const list = require('./list');
const express = require('express');
const bodyParser = require('body-parser');




//TODO: implement express app
//use express.static
//user body-parser
//set view engine to handlebars
 //app.use(express.static('public'));
let app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.set('view engine', 'hbs');


//TODO: GET /
//redirect to create-list.html
app.get('/', (req, res) => { // define route for ‘/’
	res.redirect('/create-list.html');
});



//TODO: POST /create
//get listName parameter from req.body
//call list.setName()
//redirect to /list
app.post('/create', (req,res)=>{
	list.setName(req.body.listName);
	res.redirect('/list');
});



//TODO: GET /list
//render 'list.hbs', passing list.get() object
app.get('/list', (req,res)=>{
	res.render('list',list.get());
});

//TODO: POST /add
//get listItem parameter from req.body
//call list.addItem()
//redirect to /list
app.post('/add',(req,res)=>{
	list.addItem(req.body.listItem);
	res.redirect('/list');
})


//TODO: GET /delete/:id
//get id from req.params
//call list.removeItem()
//redirect to /list
app.get('/delete/:id', function(req, res) {
	list.removeItem(req.params.id);
	res.redirect('/list');
})
//TODO: put app.listen here
app.listen(3000);
console.log("Listening on port 3000...LOL");

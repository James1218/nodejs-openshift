var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.post('/profile', upload.array(), function (req, res, next) {
//   console.log(req.body);
//   res.json(req.body);
// });

app.get('/', function(req, res){
  res.send('hello world');
});

var alice = {firstname:'alice', lastname:'zhu'};
var jason = {firstname:'nok', lastname:'nam'};
var developers = [alice, jason];

app.get('/developer/:index', function(req, res){
  var index = req.params['index'];
  res.json(developers[index]);
});

app.put("/developer/:index", function(req, res){
  var index = req.params.index;
  var newUser = req.body;
  developers[index] = newUser;
  res.json(developers);
});

app.post("/developer", function(req, res){
  var newUser = req.body;
  developers.push(newUser);
  res.json(developers);
});

app.delete('/developer/:index', function(req, res){
  var index = req.params['index'];
  developers.splice(index, 1);
  res.json(developers);
});

app.get('/developer', function(req, res){
  res.json(developers);
});

// GET /style.css etc
//_dirname : the directory where the server is running
app.use(express.static(__dirname + '/public'));

app.listen(8080);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';

mongoose.connect(connectionString);
var developerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
}, {collection: 'developer'});

var developerModel = mongoose.model('developerModel', developerSchema);


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
  var developer = new developerModel(newUser);
  developer.save(function(err, doc){
    developerModel.find(function(err, data){
        res.json(data);
    });
  });
});

app.delete('/developer/:index', function(req, res){
  var index = req.params['index'];
  developerModel.findById(index, function(err, doc){
    doc.remove();
    developerModel.find(function(err, data){
      res.json(data);
    });
  });
});

app.get('/developer', function(req, res){
  developerModel.find(function(err, data){
    res.json(data);
  });
});

// GET /style.css etc
//_dirname : the directory where the server is running
app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);
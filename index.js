var express =require('express');
var bodyParser = require('body-parser');
var pg= require('pg');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/home", function(req, res){
  res.render('homepage');
})

app.get("/home/blogs", function(req, res){
  pg.connect("postgres://postgres:abc@localhost:5432/portfolio", function(err, client, done){
    client.query(`select * from post where user_id = (select (id) from admin where name = 'Shameer Khan')`, function(err, result){
      res.render('blogs', {data : result.rows});
      done();
      pg.end();
    })
  })
})

// app.get("/home/projects", function(req,res){
//   res.render(res.sendFile(path.join(__dirname+'public/index.html')));
// })


app.listen("3000", function () {
  console.log("Now listening to port no. 3000......")
})

var path = require('path')
var fs = require('fs')
var mysql = require('mysql');
var bodyParser  = require("body-parser");

var Express = require('express')
var app = new Express()
app.use(bodyParser.json());
var port = 3000
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'q1w2e3r4',
  database: 'course'
});
connection.connect();
//connection.end();

app.get('/posts', function (req, res) {
  connection.query('SELECT * FROM posts', function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows))
  });
})

app.post('/posts', function (req, res) {
  connection.query('INSERT INTO posts(id,title,content,date) VALUES (null, ?, ?, ?)', [req.body.title, req.body.content, req.body.date], function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows))
  });
})

app.get('/posts/:id', function (req, res) {
  var id = req.params.id;
  connection.query('SELECT * FROM posts WHERE id=?', [id], function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows[0]))
  });
})

app.put('/posts/:id', function (req, res) {
  var id = req.params.id;
  connection.query('UPDATE posts SET title = ?,content = ?,date = ?  WHERE id = ?', [req.body.title, req.body.content, req.body.date, id], function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows))
  });
})

app.use(function (req, res) {
  fs.readFile(path.join(__dirname, '/index.html'), (err, indexData) => {
    if (err) throw err
    res.set('Content-Type', 'text/html')
    res.send(indexData.toString())
  })
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})

var fs = require("fs");
var nodemailer = require('nodemailer');
var credentials = require('./credentials.js');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('.'));

app.get('/', function (req, res) {
  fs.readFile('index.html', function (err, data) {
    if (err)
      data = 'file not found';
    res.type('text/html');
    res.end(data);
  });
})

app.get('/logIT', function (req, res) {
  res.type('text/plain');
  fs.readFile('logs.json', function (err, data) {
    if (err)
      throw err;
    var logs = JSON.parse(data);
    var date = new Date();
    date = date.toString().split(' ').slice(1, 5).join(' ');
    var who = req.query.who;
    var node = req.query.node;
    var what = req.query.what;
    logs.push({ 'date': date, 'who': who, 'node': node, 'what': what });

    fs.writeFile('logs.json', JSON.stringify(logs), function (err) {
      if (err)
        throw err;
      console.log('logged');
    });

    if (req.query.notify !== undefined) {
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: credentials.gmail.user,
          pass: credentials.gmail.pass,
        }
      });

      var message = {
        from: 'ildevops@gmail.com',
        to: 'david.lurth@imaginelearning.com',
        subject: 'logger notification',
        text: "who: " + who + "\r\n" + "node: " + node + "\r\n" + "what: " + what
      }

      transporter.sendMail(message, function (error, info) {
        if (error) {
          console.log('Error: ' + error.message);
          return;
        }
        console.log('Message sent: ' + info.response);
      });
    }

    res.send('success');
  });
})

//custom 404 page
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found')
})

//custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error')
})

app.listen(app.get('port'), function () {
  console.log('Express started on http://dml-dev:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
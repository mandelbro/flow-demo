var express = require('express');
var app = express();

require('dotenv').config()

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.get('/', function(request, response) {
  var appEnv = process.env.APP_ENV;
  var env = {...process.env, PS1: ""}
  if (appEnv == 'staging') {
    var envName = 'staging'
  } else if (appEnv == 'production') {
    var envName = 'production'
  } else {
    var envName = 'review app'
  }
  response.render('index.html', { appEnv: envName, env: JSON.stringify(env) });
});

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});

module.exports = app

var express = require('express');
var app = express();

const { Client } = require('pg');

const client = (databaseUrl) => new Client({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

require('dotenv').config()

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.get('/', async function(request, response) {
  var appEnv = process.env.APP_ENV;
  var env = {...process.env, PS1: ""}
  var databaseUrl = process.env.DATABASE_URL
  let databaseConnection = "Not Connected"
  const pg = client(databaseUrl);

  if (appEnv == 'staging') {
    var envName = 'staging'
  } else if (appEnv == 'production') {
    var envName = 'production'
  } else {
    var envName = 'review app'
  }

  pg.connect()

  await pg.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    databaseConnection = "Connected"
    pg.end();
  });

  response.render('index.html', {
    appEnv: envName,
    databaseConnection,
    databaseUrl,
    env: JSON.stringify(env),
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});

module.exports = app

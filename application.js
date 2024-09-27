var express = require('express');
var app = express();
const Index = require('./lib/routes/index')
const Absoultelabs = require('./lib/routes/absolutelabs')

require('dotenv').config()

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.get('/', Index);
app.get('/absolutelabs', Absoultelabs);

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});

module.exports = app

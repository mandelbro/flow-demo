const { Client } = require('pg');

const client = (databaseUrl) => new Client({
  connectionString: databaseUrl,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

const Index = async function(request, response) {
  var appEnv = process.env.APP_ENV;
  var env = {...process.env, PS1: ""}
  var databaseUrl = process.env.DATABASE_URL
  const pg = client(databaseUrl);

  if (appEnv == 'staging') {
    var envName = 'staging'
  } else if (appEnv == 'production') {
    var envName = 'production'
  } else {
    var envName = 'review app'
  }

  // pg.connect()

  // console.log(databaseUrl)
  // console.log("Connecting to database")

  // var databaseConnection ="Not Connected"
  // let query = pg.query('SELECT NOW();')
  //   .then(function success(result) {
  //     /* do something useful with your result */
  //     console.log("Database connected")
  //     console.log(["result: ", result.rows[0].now].join(''))
  //     databaseConnection = "Connected"
  //     pg.end();

  //     response.render('index.html', {
  //       appEnv: envName,
  //       databaseConnection,
  //       env: JSON.stringify(env),
  //     });
  //   })
  //   .catch(function error(err) {
  //       console.error('uploadDataToPostgres failure', err)
  //   })
}

module.exports = Index

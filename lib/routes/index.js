const { Client } = require('pg');
const pgp = require('pg-promise')(/* initialization options */);

const client = (databaseUrl) => new Client({
  connectionString: databaseUrl,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

const Index = async function(request, response) {
  var appEnv = process.env.APP_ENV;
  var env = {...process.env, PS1: ""}
  var databaseUrl = process.env.DATABASE_URL
  // const pg = client(databaseUrl);

  if (appEnv == 'staging') {
    var envName = 'staging'
  } else if (appEnv == 'production') {
    var envName = 'production'
  } else {
    var envName = 'review app'
  }

  console.log(databaseUrl)
  console.log("Connecting to database")

  const db = pgp(databaseUrl); // database instance;

  // select and return a single user name from id:
  var databaseConnection = "Not Connected"

  db.one('SELECT NOW()')
    .then(user => {
      databaseConnection = "Connected"
    })
    .catch(error => {
      console.log(error) // print the error;
    })
    .finally(() => {
      response.render('index.html', {
        appEnv: envName,
        databaseConnection,
        env: JSON.stringify(env),
      })
    })

  db.$pool.end()
}

module.exports = Index

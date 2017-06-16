/**
 * Created by qiangli on 2017/6/16.
 */
var Pool = require('pg').Pool;
var config = {
    user: 'xdaoo', //env var: PGUSER
    database: 'xdaoo', //env var: PGDATABASE
    password: '1234', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    //max: 10, // max number of clients in the pool
    //idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var conString = "postgres://xdaoo:1234@localhost:5432/database";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });
});
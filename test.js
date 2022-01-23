//---------- Test BDD ------------------
require('dotenv').config();
const client = require('./app/database');

client.query('SELECT * FROM "user"', (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log(result.rows);
    }
})


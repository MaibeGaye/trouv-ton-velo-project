/*
reçu de l'utilisateur d'une source de data
*/

// const data = {
//     username: 'Nico',
//     password: '\'); DROP TABLE post, category;"'
// };

// const sql = `INSERT INTO "user"(username, password) VALUES('${username}', '${password}'})`

//INSERT INTO "user"(username, password) VALUES('Nico', '123456')

//INSERT INTO "user"(username, password) VALUES('Nico', ''); SELECT * FROM "user"


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



// MaClass.maMethode();

// new MaClass().maMethode()

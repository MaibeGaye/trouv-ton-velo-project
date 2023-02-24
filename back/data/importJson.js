require('dotenv').config();

const users = require('./users.json');
const offers = require('./offers.json');

const client = require('../app/db-pg');

const importData = async () => {
    //on supprime les événtuels enregistrements présents
    // et on reset la numéroation des ids afin que le 1er rec soit d'id 1, le 2nd d'id 2, etc...
    await client.query('TRUNCATE offer, "user" RESTART IDENTITY');
    //on va stocker l'id des catégories au fur et à mesure des insertions
    //on en a besoin pour créer les offers ensuite, ce sera plus efficace que de refaire une requête pour récupérer l'id en base
    // const usersIds = {};

    //on insère les catégories et on remplit l'object usersIds
    for (const user of users) {
        //avec RETURNING, on demande explicitement à Postgres de nous renvoyer dans le code l'id de l'enregistrement fraichement créé
        const {rows} = await client.query('INSERT INTO "user"(username, lastname, firstname, email, password, address, zip_code) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, lastname, firstname', [user.username, user.lastname, user.firstname, user.email, user.password, user.address, user.zip_code]);
        //on stocke cet id en l'associant au label de la catégorie
        // usersIds[user.label] = rows[0].id;
        // console.log(usersIds);
        console.log(`insert user '${rows[0].lastname} ${rows[0].firstname}' (id ${rows[0].id})`);
    }

    for (const offer of offers) {
        //on récupère l'id de la catégorie de chaque post et on fait l'insertion
        // const categoryId = usersIds[post.category];
        const {rows} = await client.query('INSERT INTO offer(title, infos, model, size, helmet, lamps, safety_lock, photo, address, zip_code, validity_start_date, validity_end_date, lender_id, borrower_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id, title, lender_id', [offer.title, offer.infos, offer.model, offer.size, offer.helmet, offer.lamps, offer.safety_lock, offer.photo, offer.address, offer.zip_code, offer.validity_start_date, offer.validity_end_date, offer.lender_id, offer.borrower_id]);
        console.log(`insert offre '${rows[0].title}, lender_id : ${rows[0].lender_id}' (offer id : ${rows[0].id})`);
    }
    client.end();

};

importData();
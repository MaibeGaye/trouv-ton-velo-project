require('dotenv').config();

const categories = require('./categories.json');
const posts = require('./posts.json');

const client = require('../app/database');

const importData = async () => {
    //on supprime les événtuels enregistrements présents
    // et on reset la numéroation des ids afin que le 1er rec soit d'id 1, le 2nd d'id 2, etc...
    await client.query('TRUNCATE post, category RESTART IDENTITY');
    //on va stocker l'id des catégories au fur et à mesure des insertions
    //on en a besoin pour créer les posts ensuite, ce sera plus efficace que de refaire une requête pour récupérer l'id en base
    const categoriesIds = {};

    //on insère les catégories et on remplit l'object categoriesIds
    for (const category of categories) {
        //avec RETURNING, on demande explicitement à Postgres de nous renvoyer dans le code l'id de l'enregistrement fraichement créé
        const {rows} = await client.query('INSERT INTO category(route, label) VALUES($1, $2) RETURNING id', [category.route, category.label]);
        //on stocke cet id en l'associant au label de la catégorie
        categoriesIds[category.label] = rows[0].id;
        console.log(categoriesIds);
    }

    for (const post of posts) {
        //on récupère l'id de la catégorie de chaque post et on fait l'insertion
        const categoryId = categoriesIds[post.category];
        await client.query('INSERT INTO post(slug, title, excerpt, content, category_id) VALUES($1, $2, $3, $4, $5)', [post.slug, post.title, post.excerpt, post.content, categoryId]);
    }
    client.end();

};

importData();
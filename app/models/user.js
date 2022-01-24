const client = require('../database');

/**
 * An entity representing a user
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} lastname
 * @property {string} firstname
 * @property {string} email
 * @property {string} password
 * @property {string} address
 * @property {string} zip_code
 */



/**
 * A model representing a user
 * @class User
 */
class User {

    /**
     * The User constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */
    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Fetches all users from the database
     * @returns {Array<User>}
     * @static
     * @async
     */
    static async findAll() {
        const {rows} = await client.query('SELECT * FROM "user"');
        return rows.map(row => new User(row));
        /*
        const posts = [];
        for (const row of rows) {
            const post = new Post(row);
            posts.push(post);
        }
        return posts;
        */
    }

    /**
     * Fetches a single user from the database
     * @param {number} id 
     * @returns {Post|null} null if no post matches the id in database
     * @static
     * @async
     */
     static async findOne(id) {
        const {rows} = await client.query('SELECT * FROM "user" WHERE id=$1', [id]);
        //on vérifie qu'on a bien obtenu des data de la BDD
        if (rows[0]) { // if (rows[0] !== undefined)
            return new User(rows[0]);
        } else {
            console.log(`No user found for id ${id}`);
            return null;
        }
    }
}

module.exports = User;

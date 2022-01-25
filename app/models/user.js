const client = require('../database');
const bcrypt = require('bcrypt');

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
        try {
            const {rows} = await client.query('SELECT * FROM "user"');
            return rows.map(row => new User(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Fetches a single user from the database
     * @param {number} id 
     * @returns {Post|null} null if no post matches the id in database
     * @static
     * @async
     */
    static async findOne(id) {
        try {
            const {rows} = await client.query('SELECT * FROM "user" WHERE id=$1', [id]);
            if (rows[0]) {
                return new User(rows[0]);
            } else {
                console.log(`No user found for id ${id}`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async getByEmail(email, password) {
        try {
            const {rows} = await client.query('SELECT * FROM "user" WHERE email=$1', [email]);
            //on vérifie qu'on a bien obtenu des data de la BDD
            if (!rows[0]) {
                throw new Error('email non reconnu ' + error.detail);
            }

            //on check si le mot de passe en clair dans le formulaire matche avec la version chiffrée stockée en BDD
            const isPwdValid = await bcrypt.compare(password, rows[0].password)
            if (isPwdValid === false) {
                return console.log('email ok mais mdp incorrect');
            }

            // on crée une nouvelle instance pour la retourner au front à la validation du login
            return new User(rows[0]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async getCredentialsById(id) {
        try {
            const {rows} = await client.query('SELECT email, password FROM "user" WHERE id=$1', [id]);
            //on vérifie qu'on a bien obtenu des data de la BDD
            if (rows[0]) { // if (rows[0] !== undefined)
                return new User(rows[0]);
            } else {
                console.log(`No user found for id ${id}`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    async save() {
        try {
            //prend pas en compte le hash du pwd
            if (this.id) {
                await client.query('SELECT * FROM update_user($1)', [this]);
            } else {
                const hashedPwd = await bcrypt.hash(this.password, 10);
                this.password = hashedPwd;

                const {rows} =  await client.query('SELECT * FROM add_user($1)', [this]);
                this.id = rows[0].id;

                return this;
            } 
        } catch (error) {
                console.log(error);
                if (error.detail) {
                    throw new Error('On a une erreur SQL : ' + error.detail);
                }
                throw error;
            }
        }
}    

module.exports = User;

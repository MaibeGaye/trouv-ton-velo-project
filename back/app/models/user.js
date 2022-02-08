const client = require('../db-pg.js');
const bcrypt = require('bcrypt');
const Offer = require('./offer');

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
    /**
     * Allows a user to login 
     * @returns {User} the logged in user
     * @async
     * @throws {Error} a potential SQL error
     */
    async getByEmail() {
        try {
            const {rows} = await client.query('SELECT * FROM "user" WHERE email=$1', [this.email]);
            if (!rows[0]) {
                throw new Error('unknown email');
            }

            const isPwdValid = await bcrypt.compare(this.password, rows[0].password)
            if (!isPwdValid) {
                throw new Error('email ok but wrong mdp');
            }

            this.id = rows[0].id;
            this.email = rows[0].email;
            this.password = rows[0].password;
            this.logged = true;
            return this;
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Updates and adds a user to the database
     * @returns {User} the newly updated or created user
     * @async
     * @throws {Error} a potential SQL error
     */
    async save() {
        try {
            if (this.id) {
                const hashedPwd = await bcrypt.hash(this.password, 10);
                this.password = hashedPwd;
                await client.query('SELECT * FROM update_user($1)', [this]);
                return this;
            } else {
                const hashedPwd = await bcrypt.hash(this.password, 10);
                this.password = hashedPwd;

                const {rows} =  await client.query('SELECT * FROM add_user($1)', [this]);

                if (this.passwordConfirm) {
                  delete this.passwordConfirm;
                }

                this.id = rows[0].id;

                return this;
            } 
        } catch (error) {
                console.log(error);
                if (error.detail) {
                    throw new Error('SQL error : ' + error.detail);
                }
                throw error;
            }
        }

    /**
     * Deletes a user from the database
     * @returns {void} Nothing to return
     * @async
     * @static
     * @throws {Error} a potential SQL error
     */
    static async delete(id) {
        try {
            await client.query('DELETE FROM "user" WHERE id=$1', [id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async getUserInfos(id) {
        try {
            const {rows} =  await client.query('SELECT * FROM "user" WHERE id=$1', [id]);

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

    static async getLendedOffers(id) {
        try {
            const {rows} =  await client.query('SELECT * FROM "offer" WHERE lender_id=$1', [id]);

            if (rows[0]) {
                return rows.map(row => new Offer(row));
            } else {
                console.log(`No offer found for lender_id ${id}`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async getBorrowedOffers(id) {
        try {
            const {rows} =  await client.query('SELECT * FROM "offer" WHERE borrower_id=$1', [id]);
            if (rows[0]) {
                return rows.map(row => new Offer(row));
            } else {
                console.log(`No offer found for borrower_id ${id}`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async getCurrentBorrowerInfos(id) {
        try {
            const {rows} =  await client.query('SELECT "user".username FROM "offer" FULL JOIN "user" ON "user".id=$1 WHERE lender_id=$1', [id]);
            console.log(rows);
            if (rows[0]) {
                return rows.map(row => new Offer(row));
            } else {
                console.log(`No offer found for borrower_id ${id}`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}    

module.exports = User;

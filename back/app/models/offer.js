<<<<<<< HEAD
const client = require('../db-pg.js');
=======
const client = require('../database');
>>>>>>> develop

/**
 * An entity representing an offer
 * @typedef {Object} Offer
 * @property {number} id
 * @property {string} title
 * @property {string} infos
 * @property {string} model
 * @property {string} size
 * @property {boolean} helmet
 * @property {boolean} lamps
 * @property {boolean} safety_lock
 * @property {string} photo
 * @property {string} address
 * @property {number} zip_code
<<<<<<< HEAD
 * @property {Date} validity_start_date
 * @property {Date} validity_end_date
=======
 * @property {string} validity_start_date
 * @property {string} validity_end_date
>>>>>>> develop
 * @property {number} lender_id
 * @property {number} borrower_id
 */



/**
 * A model representing an offer
 * @class Offer
 */
class Offer {

    /**
     * The Offer constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */
    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Fetches all offers from the database
     * @returns {Array<Offer>}
     * @static
     * @async
     * @throws {Error} An error
     */
    static async findAll() {
        try {
            const {rows} = await client.query('SELECT * FROM "offer"');
            return rows.map(row => new Offer(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Fetches a single offer from the database
     * @param {number} id 
     * @returns {Offer|null} null if no offer matches the id in database, null if no record was found
     * @static
     * @async
     * @throws {Error} An error
     */
    static async findOne(id) {
        try {
            const {rows} = await client.query('SELECT * FROM offer WHERE id=$1', [id]);
            if (rows[0]) {
<<<<<<< HEAD
                const lenderId = rows[0].lender_id;
                const lenderUsername = await client.query('SELECT username FROM "user" WHERE id=$1', [lenderId]);
                rows[0].lenderUsername = lenderUsername.rows[0].username;
=======
>>>>>>> develop
                return new Offer(rows[0]);
            } else {
                console.log(`No offer found for id ${id}`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
<<<<<<< HEAD

    /**
     * Filters offer from the database
     * @param {Object} filters 
     * @returns {Array<Offer>|null} null if no offer matches the filters in database, null if no record was found
     * @static
     * @async
     * @throws {Error} An error
     */
     static async filter(filters) { 
        try {
            let queryString = "SELECT * FROM offer WHERE borrower_id IS NULL"
            for (const value in filters) {
                if (typeof filters[value] === 'boolean' || filters[value] instanceof Boolean){
                    queryString += ` AND ${value}=${filters[value]}`;
                } else {
                    queryString += ` AND ${value}='${filters[value]}'`;
                }
            }
            console.log(queryString);
            const {rows} = await client.query(queryString);
            if (rows[0]) {
                console.log(`OK ${rows.length} offers found with these filter values`);
                return rows.map(row => new Offer(row));
            } else {
                console.log(`0 offers left after filtering.`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

=======
>>>>>>> develop
    /**
     * Updates and adds an offer to the database
     * @returns {Offer} the newly created offer
     * @async
     * @throws {Error} a potential SQL error
     */
    async save() {
        try {
            if (this.id) {
                await client.query('SELECT * FROM update_offer($1)', [this]);
<<<<<<< HEAD
                return this;
=======
>>>>>>> develop
            } else {
                const {rows} = await client.query('SELECT * FROM add_offer($1)', [this]);
                this.id = rows[0].id;
                return this;
            }
        } catch (error) {
                console.log(error);
                if (error.detail) {
<<<<<<< HEAD
                    throw new Error('SQL Error : ' + error.detail);
=======
                    throw new Error('On a une erreur SQL : ' + error.detail);
>>>>>>> develop
                }
                throw error;
            }
            
        }
   
 /**
     * Deletes an offer from the database
     * @returns {void} Nothing to return
     * @async
<<<<<<< HEAD
     * @static
     * @throws {Error} a potential SQL error
     */
    static async delete(id) {
=======
     * @throws {Error} a potential SQL error
     */
    async delete(id) {
>>>>>>> develop
        try {
            await client.query('DELETE FROM offer WHERE id=$1', [id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
<<<<<<< HEAD

    /**
     * Returns an offer's lender id value
     * @param {number} id 
     * @returns {number|null} null if no offer matches the id in database, null if no record was found
     * @static
     * @async
     * @throws {Error} An error
     */
     static async returnLenderId(id) {
        try {
            const {rows} = await client.query('SELECT lender_id FROM offer WHERE id=$1', [id]);
            if (rows[0]) {
                return rows[0].lender_id;
            } else {
                console.log(`No offer found for id ${id}`);
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
     * Returns the borrower_id value of the specified offer id
     * @param {number} id 
     * @returns {number|null} null if no offer matches the id in database, null if no record was found
     * @static
     * @async
     * @throws {Error} An error
     */
    static async returnBorrowerId(id) {
        try {
            const {rows} = await client.query('SELECT borrower_id FROM offer WHERE id=$1', [id]);
            if (rows[0]) {
                return rows[0].borrower_id;
            } else {
                console.log(`No offer found for id ${id}`);
                return null;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
=======
>>>>>>> develop
}

module.exports = Offer;

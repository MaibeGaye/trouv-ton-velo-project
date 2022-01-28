const client = require('../database');

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
 * @property {string} validity_start_date
 * @property {string} validity_end_date
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

    /**
     * Fetches a single offer from the database
     * @param {number} id 
     * @returns {Offer|null} null if no offer matches the id in database, null if no record was found
     * @static
     * @async
     * @throws {Error} An error
     */
     static async filter(filters) {
        try {

            console.log(filters);
            const {rows} = await client.query('SELECT * FROM offer WHERE id=2');
            if (rows[0]) {
                return rows.map(row => new Offer(row));
            } else {
                console.log(`No offer found`);
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
     * Updates and adds an offer to the database
     * @returns {Offer} the newly created offer
     * @async
     * @throws {Error} a potential SQL error
     */
    async save() {
        try {
            if (this.id) {
                await client.query('SELECT * FROM update_offer($1)', [this]);
            } else {
                const {rows} = await client.query('SELECT * FROM add_offer($1)', [this]);
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
   
 /**
     * Deletes an offer from the database
     * @returns {void} Nothing to return
     * @async
     * @throws {Error} a potential SQL error
     */
    async delete(id) {
        try {
            await client.query('DELETE FROM offer WHERE id=$1', [id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Offer;

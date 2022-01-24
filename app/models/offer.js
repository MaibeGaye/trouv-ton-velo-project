const client = require('../database');

/**
 * An entity representing an offer
 * @typedef {Object} Offer
 * @property {number} id
 * @property {string} title
 * @property {string} infos
 * @property {string} model
 * @property {string} size
 * @property {string} helmet
 * @property {string} lamps
 * @property {string} safety_lock
 * @property {string} photo
 * @property {string} address
 * @property {string} zip_code
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
     * Adds an offer to the database
     * @returns {Offer} the newly created offer
     * @throws {Error} a potential SQL error
     */
     async save() {
        if (this.id) {
            //TODO : code the update of an existing offer
            await client.query('SELECT * FROM update_offer($1)', [this]);
        } else {
            try {
                const {rows} = await client.query('INSERT INTO offer(title, infos, model, size, helmet, lamps, safety_lock, photo, address, zip_code, validity_start_date, validity_end_date, lender_id, borrower_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id', [
                    this.title,
                    this.infos,
                    this.model,
                    this.size,
                    this.helmet,
                    this.lamps,
                    this.safety_lock,
                    this.photo,
                    this.address,
                    this.zip_code,
                    this.validity_start_date,
                    this.validity_end_date,
                    this.lender_id,
                    this.borrower_id
                ]);
                this.id = rows[0].id;
    
            } catch (error) {
                console.log(error);
                if (error.detail) {
                    throw new Error('On a eu un gros pépin c\'est la misère !!!' + error.detail);
                }
                throw error;
            }
        }
    }

    async delete() {
        try {
            await client.query('DELETE FROM offer WHERE id=$1', [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Offer;

const client = require('../database');

/**
 * An entity representing a blog post
 * @typedef {Object} Offer
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {string} category
 * @property {number} category_id
 */



/**
 * A model representing a blog post
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
     * Fetches all posts from the database
     * @returns {Array<Offer>}
     * @static
     * @async
     */
    static async findAll() {
        const {rows} = await client.query('SELECT * FROM "offer"');
        return rows.map(row => new Offer(row));
        /*
        const posts = [];
        for (const row of rows) {
            const post = new Post(row);
            posts.push(post);
        }
        return posts;
        */
    }
}

module.exports = Offer;

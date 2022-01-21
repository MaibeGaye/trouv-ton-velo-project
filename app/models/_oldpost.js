const client = require('../database');

/**
 * An entity representing a blog post
 * @typedef {Object} Post
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
 * @class Post
 */
class Post {

    /**
     * The Post constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */
    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Fetches all posts from the database
     * @returns {Array<Post>}
     * @static
     * @async
     */
    static async findAll() {
        const {rows} = await client.query('SELECT * FROM post_with_category');
        return rows.map(row => new Post(row));
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
     * Fetches a single post from the database
     * @param {number} id 
     * @returns {Post|null} null if no post matches the id in database
     * @static
     * @async
     */
    static async findOne(id) {
        const {rows} = await client.query('SELECT * FROM post_with_category WHERE id=$1', [id]);
        //on vérifie qu'on a bien obtenu des data de la BDD
        if (rows[0]) { // if (rows[0] !== undefined)
            return new Post(rows[0]);
        } else {
            console.log(`No post found for id ${id}`);
            return null;
        }
    }

    /**
     * Fetches all posts with the given category from database
     * @param {number} catId Category id 
     * @returns {Array<Post>} can be empty with unpopular or inexisting categories
     * 
     */
    static async findByCategory(catId) {
        const {rows} = await client.query('SELECT * FROM post_with_category WHERE category_id=$1', [catId]);
        return rows.map(row => new Post(row));
    }

    /**
     * Add a post to the database
     * @returns {Post} the newly created post
     * @throws {Error} a potential SQL error
     */
    async save() {
        if (this.id) {
            //on update
            //TODO : coder la mise à jour d'un post existant
        } else {
            try {
                const {rows} = await client.query('INSERT INTO post(slug, title, excerpt, content, category_id) VALUES($1, $2, $3, $4, $5) RETURNING id', [
                    this.slug,
                    this.title,
                    this.excerpt,
                    this.content,
                    this.category_id
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
}

module.exports = Post;
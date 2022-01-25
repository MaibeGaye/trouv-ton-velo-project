const {Router} = require('express');

const userController = require('./controllers/userController');
const offerController = require('./controllers/offerController');

// joi
// const offerSchema = require('./schemas/offerSchema');
// const userSchema = require('./schemas/userSchema');
const loginSchema = require('./schemas/loginSchema');
const signupSchema = require('./schemas/signupSchema');
const {validateBody} = require('./middlewares/validator');

// redis
// const {cache, flush} = require('./services/cache');

const router = Router();

// joi
const loginMiddleware = validateBody(loginSchema);
const signupMiddleware = validateBody(signupSchema);


router.get('/getUserTest', userController.findOne);

/**
 * GET /getAllUsers
 * @summary Responds with all users in database
 * @route GET /getAllUsers
 * @tags Users
 * @returns {array<User>} 200 - An array of users
 */
router.get('/getAllUsers', userController.findAll);

/**
 * GET /getAllOffers
 * @summary Responds with all offers in database
 * @route GET /getAllOffers
 * @tags Offers
 * @returns {array<Offer>} 200 - An array of offers
 */
router.get('/getAllOffers', offerController.findAll);
// router.get('/posts', cache, postController.findAll);

/**
 * GET /getOneOffer/{id}
 * @summary Responds with one offer from database
 * @route GET /getOneOffer/{id}
 * @tags Offers
 * @param {number} id.path.required The id of the offer to fetch
 * @returns {Offer} 200 - A single offer identified by its id
 * @returns {string} 404 - An error message
 * 
 */
router.get('/getOneOffer/:id(\\d+)', offerController.findOne);


/**
 * Expected json object in request.body
 * @typedef {object} UserJson
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
 * POST /signup
 * @summary Adds a new user in database
 * @tags Users
 * @param {UserJson} request.body.required User info to add in database
 * @returns {User} 201 - The newly created user
 * @returns {string} 500 - An error message
 */
router.post('/signup', signupMiddleware, userController.handleSignup);

// TODO add jsdoc for the /login route
router.post('/login', loginMiddleware, userController.handleLogin);



//---------------------- Oblog JSdoc + routes --------------------------


/**
 * GET /v1/categories
 * @summary Responds with all catagories in database
 * @route GET /v1/categories
 * @tags Categories
 * @returns {array<Category>} 200 - An array of categories
 */
// router.get('/categories', cache, categoryController.findAll);

/**
 * GET /v1/posts/{id}
 * @summary Responds with one post from database
 * @route GET /v1/posts/{id}
 * @tags Posts
 * @param {number} id.path.required The id of the post to fetch
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
 * 
 */
// router.get('/posts/:id(\\d+)', cache, postController.findOne);

/**
 * GET /v1/posts/categories/{id}
 * @summary Responds with posts from a specific category in database
 * @route GET /v1/posts/categories/{id}
 * @tags Posts
 * @param {number} id.path.required The id of the desired category
 * @returns {array<Post>} 200 - An array of posts with a specific category, can be empty
 */
// router.get('/posts/categories/:id(\\d+)', cache, postController.findByCategory)


/**
 * Expected json object in request.body
 * @typedef {object} PostJson
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {number} category_id
 */

/**
 * POST /v1/posts
 * @summary Add a new post in database
 * @tags Posts
 * @param {PostJson} request.body.required Post infos to add in database
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
 */

// joi + redis
// router.post('/posts', myCustomMiddleware, flush, postController.addPost);
// router.post('/posts', postController.addPost);


module.exports = router;

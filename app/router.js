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


// redis
// router.post('/posts', myCustomMiddleware, flush, postController.addPost);

module.exports = router;

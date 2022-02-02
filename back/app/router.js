const {Router} = require('express');

const userController = require('./controllers/userController');
const offerController = require('./controllers/offerController');

// joi
// const offerSchema = require('./schemas/offerSchema');
const userSchema = require('./schemas/userSchema');
const loginSchema = require('./schemas/loginSchema');
const signupSchema = require('./schemas/signupSchema');
const offerSchema = require('./schemas/offerSchema')
const {validateBody} = require('./middlewares/validator');
const jwtMW = require('./middlewares/jwtMW');

// redis
const {cache, flush} = require('./services/cache');

const router = Router();

// joi
const userMiddleware = validateBody(userSchema);
const loginMiddleware = validateBody(loginSchema);
const signupMiddleware = validateBody(signupSchema);
const offerMiddleware = validateBody(offerSchema);

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
 * GET /offers
 * @summary Responds with all offers in database
 * @route GET /offers
 * @tags Offers
 * @returns {array<Offer>} 200 - An array of offers
 */
router.get('/offers', cache, offerController.findAll);

/**
 * POST /offers
 * @summary Responds with offers filtered in database
 * @route POST /offers
 * @tags Offers
 * @returns {array<Offer>} 200 - An array of offers
 */
 router.post('/offers', offerController.findFiltered);

/**
 * GET /offer/{id}
 * @summary Responds with one offer from database
 * @route GET /offer/{id}
 * @tags Offers
 * @param {number} id.path.required The id of the offer to fetch
 * @returns {Offer} 200 - A single offer identified by its id
 * @returns {string} 404 - An error message
 * 
 */
router.get('/offer/:id(\\d+)', offerController.findOne);

/**
 * Expected json object in request.body
 * @typedef {object} OfferJson
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
 * POST /create
 * @summary Adds a new offer in database
 * @tags Offers
 * @param {OfferJson} request.body.required User info to add in database
 * @returns {Offer} 201 - The newly created offer
 * @returns {string} 500 - An error message
 */
router.post('/create', offerMiddleware, jwtMW, offerController.create);


/**
 * PATCH /dashboard/{offerId}/edit
 * @summary Updates an existing offer in database
 * @tags Offers
 * @param {number} id.path.required The id of the offer to fetch
 * @param {OfferJson} request.body.required Offer info to add in database
 * @returns {Offer} 200 - The updated offer
 * @returns {string} 500 - An error message
 */
router.patch('/dashboard/:offerId(\\d+)/edit', jwtMW, offerController.edit);
// il faudra lui fournir


/**
 * DELETE /dashboard/{offerId}/delete
 * @summary Deletes an existing offer in database
 * @tags Offers
 * @param {number} id.path.required The id of the offer to delete
 * @returns {string} 200 - The deleted offer confirmation
 * @returns {string} 500 - An error message
 */
router.delete('/dashboard/:offerId(\\d+)/delete', jwtMW, offerController.delete);

/**
 * PATCH /dashboard/edit
 * @summary Updates current user infos in database
 * @tags Users
 * @param {number} id.path.required The id of the offer to fetch
 * @param {OfferJson} request.body.required User info to add in database
 * @returns {Offer} 200 - The updated offer
 * @returns {string} 500 - An error message
 */
 router.patch('/dashboard/edit', userMiddleware, jwtMW, userController.edit);

 /**
  * DELETE /dashboard/delete
  * @summary Deletes the current user in database
  * @tags Users
  * @param {number} id.path.required The id of the offer to fetch
  * @returns {string} 200 - The deleted user confirmation
  * @returns {string} 500 - An error message
  */
 router.delete('/dashboard/delete', jwtMW, userController.delete);

/**
 * GET /dashboard
 * @summary Responds with a user info in database
 * @route GET /dashboard
 * @tags User
 * @returns {array<User>} 200 - An array of user info
 */
router.get('/dashboard', jwtMW, userController.userDashboard);

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


/**
 * POST /login
 * @summary Logs in a user in database
 * @tags Users
 * @param {UserJson} request.body.required User login info to add in database
 * @returns {User} 200 - The logged in user
 * @returns {string} 500 - An error message
 */
router.post('/login', loginMiddleware, userController.handleLogin);

// redis
// router.post('/posts', myCustomMiddleware, flush, postController.addPost);

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// Import Middleware
const checkForSession = require('./middlewares/checkForSession');

// Import Controllers
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

const {SESSION_SECRET, SERVER_PORT} = process.env;

// Top-Level Middleware
const app = express();
app.use(bodyParser.json());
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(checkForSession);
app.use(express.static( `${__dirname}/../build`));

// Swag Routes
app.get('/api/swag', swagController.read);

// Auth Routes
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

// Cart Routes
app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.remove);

// Search Routes
app.get('/api/search', searchController);

const port = SERVER_PORT || 4001
app.listen(port, () => console.log(`Listening on port ${port} ⚓️`));
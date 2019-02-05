const swag = require('../models/swag');

module.exports = {
	add: (req, res, next) => {
		const {id} = req.query;
		const {user} = req.session;
		const index = user.cart.findIndex(swag => swag.id === +id);

		if (index === -1) {
			const item = swag.find(item => item.id === +id);
			user.cart.push(item);
			user.total += item.price;
		}
		res.status(200).json(user);
	},

	remove: (req, res, next) => {
		const {id} = req.query;
		const {user} = req.session;
		const index = user.cart.findIndex(item => item.id === +id);

		if (index !== -1) {
			user.total -= user.cart[index].price;
			user.cart.splice(index, 1);
		}
		res.status(200).json(user);
	},

	checkout: (req, res, next) => {
		const {user} = req.session;
		user.cart = [];
		user.total = 0.00;

		res.status(200).json(user);
	}
}
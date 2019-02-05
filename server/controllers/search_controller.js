const swag = require('../models/swag');

module.exports = (req, res, next) => {
	const {category} = req.query;

	let searchResult = swag.filter(item => item.category.includes(category));

	if (category !== undefined) {
		res.status(200).json(searchResult);
	} else {
		res.status(200).json(swag);
	}
}
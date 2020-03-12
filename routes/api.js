/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
	const convertHandler = new ConvertHandler();

	app.route('/api/convert').get(function(req, res) {
		const input = req.query.input;

		const initNum = convertHandler.getNum(input);
		const initUnit = convertHandler.getUnit(input);

		if (initNum === 'invalid number' && initUnit === 'invalid unit') {
			res.json(`invalid number and unit`);
		} else if (initNum === 'invalid number') {
			res.json(initNum);
			return;
		} else if (initUnit === 'invalid unit') {
			res.json(initUnit);
			return;
		} else {
			const returnNum = convertHandler.convert(initNum, initUnit);
			const returnUnit = convertHandler.getReturnUnit(initUnit);
			const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

			res.json({
				initNum,
				initUnit,
				returnNum,
				returnUnit,
				string: toString,
			});
		}
	});
};

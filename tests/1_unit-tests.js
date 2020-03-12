/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
	suite('Function convertHandler.getNum(input)', function() {
		test('Whole number input', function(done) {
			const input = '32L';
			assert.equal(convertHandler.getNum(input), 32);
			done();
		});

		test('Decimal Input', function(done) {
			const input = '32.55L';
			assert.equal(convertHandler.getNum(input), 32.55);
			done();
		});

		test('Fractional Input', function(done) {
			const input = '1/3L';
			assert.approximately(convertHandler.getFractionalNum(input), 0.3333, 0.01);
			done();
		});

		test('Fractional Input w/ Decimal', function(done) {
			const input = '0.5/3.1L';
			assert.approximately(convertHandler.getFractionalNum(input), 0.3333, 0.1612, 0.01);
			done();
		});

		test('Invalid Input (double fraction)', function(done) {
			const input = '0.5/3.1/5/2L';
			assert.equal(convertHandler.getFractionalNum(input), 'invalid number');
			done();
		});

		test('No Numerical Input', function(done) {
			const input = '42';
			assert.equal(convertHandler.getFractionalNum(input), 'invalid unit');
			done();
		});
	});

	suite('Function convertHandler.getUnit(input)', function() {
		const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
		test('For Each Valid Unit Inputs', function(done) {
			assert.include(input, convertHandler.getUnit);

			done();
		});

		test('Unknown Unit Input', function(done) {
			if (!input.includes(convertHandler.getUnit)) {
				assert.equal(convertHandler.getUnit, 'invalid unit');
			}
		});
	});

	suite('Function convertHandler.getReturnUnit(initUnit)', function() {
		test('For Each Valid Unit Inputs', function(done) {
			const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
			const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
			input.forEach(function(ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
			});
			done();
		});
	});

	suite('Function convertHandler.spellOutUnit(unit)', function() {
		test('For Each Valid Unit Inputs', function(done) {
			const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
			const expect = ['gallon', 'litre', 'miles', 'kilometers', 'kilograms', 'pound'];
			input.forEach(function(ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
			});
			done();
		});
	});

	suite('Function convertHandler.convert(num, unit)', function() {
		test('Gal to L', function(done) {
			const input = [5, 'gal'];
			const expected = 18.9271;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('L to Gal', function(done) {
			const input = [5, 'l'];
			const expected = 1.32086;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('mi to km', function(done) {
			const input = [5, 'mi'];
			const expected = 18.9271;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('km to mi', function(done) {
			const input = [5, 'km'];
			const expected = 8.0467;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('Lbs to Kg', function(done) {
			const input = [5, 'lbs'];
			const expected = 2.26796;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('Kg to Lbs', function(done) {
			const input = [5, 'kg'];
			const expected = 11.02312;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});
	});
});

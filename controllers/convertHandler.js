/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
	this.getNum = function(input) {
		const regex = new RegExp(/[a-zA-Z]+/);
		const fracRegex = new RegExp(/\//);

		// let num = input.split(regex)[0];

		let num = input.split(regex)[0] || 1;

		if (fracRegex.test(num)) {
			return this.getFractionalNum(num);
		} else {
			return Number(num);
		}
	};
	this.getFractionalNum = function(input) {
		let result = input.split('/');
		if (result.length > 2) return 'invalid number';
		else {
			return result[0] / result[1];
		}
	};

	this.getUnit = function(input) {
		const regex = new RegExp(/[a-zA-Z]+/);

		const unit = input.match(regex)[0];
		const validUnit = [
			'gal',
			'l',
			'mi',
			'km',
			'lbs',
			'kg',
			'GAL',
			'L',
			'MI',
			'KM',
			'LBS',
			'KG',
		];
		if (!validUnit.includes(unit)) {
			return 'invalid unit';
		}

		return unit.toLowerCase();
	};

	this.getReturnUnit = function(initUnit) {
		const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
		const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];

		return expect[input.indexOf(initUnit)];
	};

	this.spellOutUnit = function(unit) {
		const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
		const expect = ['gallon', 'litre', 'miles', 'kilometers', 'kilograms', 'pound'];

		return expect[input.indexOf(unit)];
	};

	this.convert = function(initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		let result;
		if (initUnit === 'gal' || initUnit === 'l') {
			return initUnit === 'gal' ? (result = initNum * galToL) : (result = initNum / galToL);
		}
		if (initUnit === 'lbs' || initUnit === 'kg') {
			return initUnit === 'lbs' ? (result = initNum * lbsToKg) : (result = initNum / lbsToKg);
		}
		if (initUnit === 'mi' || initUnit === 'km') {
			return initUnit === 'mi' ? (result = initNum * miToKm) : (result = initNum / miToKm);
		}
		return result;
	};

	this.getString = function(initNum, initUnit, returnNum, returnUnit) {
		return `${initNum}${initUnit} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
	};
}

module.exports = ConvertHandler;

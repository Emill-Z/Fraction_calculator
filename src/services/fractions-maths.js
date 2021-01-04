/**
 * @param num
 * @returns {boolean}
 */
const isNumeric = num => !isNaN(parseFloat(num)) && isFinite(num);

/**
 * Returns the smallest common multiple for an array of parameters
 * @param arr
 */
const findLeastCommonMultiple = arr => {
  let lcm = Math.abs(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    let current = Math.abs(arr[i]);
    let next = lcm;
    while (lcm && current) {
      lcm > current ? lcm %= current : current %= lcm;
    }
    lcm = Math.abs(next * arr[i]) / (lcm + current);
  }
  return lcm;
};

/**
 * Helper functions for mathematical operations with fractions
 */

const returnFraction = {
  numerator: null,
  denominator: null
};

const multiply = (x, y) => {
  returnFraction.numerator = +x.numerator * +y.numerator;
  returnFraction.denominator = +x.denominator * +y.denominator;
  return returnFraction;
};

const divide = (x, y) => {
  returnFraction.numerator = +x.numerator * +y.denominator;
  returnFraction.denominator = +x.denominator * +y.numerator;
  return returnFraction;
};

const sum = (x, y) => {
  const lcm = findLeastCommonMultiple([x.denominator, y.denominator]);
  returnFraction.numerator = +x.numerator * (lcm / x.denominator) + +y.numerator * (lcm / y.denominator);
  returnFraction.denominator = lcm;
  return returnFraction;

};

const sub = (x, y) => {
  const lcm = findLeastCommonMultiple([x.denominator, y.denominator]);
  returnFraction.numerator = +x.numerator * (lcm / x.denominator) - +y.numerator * (lcm / y.denominator);
  returnFraction.denominator = lcm;
  return returnFraction;
};

export {
  sum,
  multiply,
  divide,
  sub,
  isNumeric
}
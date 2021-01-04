import * as fm from './fractions-maths'

/**
 * Reverse polish notation
 * https://en.wikipedia.org/wiki/Reverse_Polish_notation
 */

const OPERATORS = {
    '+': {
        precedence: 2,
        method: (x, y) => fm.sum(x, y)
    },
    '-': {
        precedence: 2,
        method: (x, y) => fm.sub(x, y)
    },
    '*': {
        precedence: 3,
        method: (x, y) => fm.multiply(x, y)
    },
    '/': {
        precedence: 3,
        method: (x, y) => fm.divide(x, y)
    }
};

/**
 * Example: 'a + b * c - d / e' === > 'a b c * + d e / -'
 * @param infixArr
 */
const transformToPostFix = infixArr => {

    let postFix = [];
    let operationsStack = [];

    for (let i = 0; i < infixArr.length; i++) {
        const ITEM = infixArr[i];

        if (!ITEM.operator) {
            postFix.push(ITEM);
        } else {
            let op1 = ITEM;
            let op2 = operationsStack[operationsStack.length - 1];

            while (op2 && OPERATORS[op1.operator].precedence <= OPERATORS[op2.operator].precedence) {
                postFix.push(operationsStack.pop());
                op2 = operationsStack[operationsStack.length - 1];
            }
            operationsStack.push(op1);
        }
    }

    while (operationsStack.length > 0) {
        postFix.push(operationsStack.pop());
    }

    return postFix;
};

/**
 * @param postfixArr
 * @returns {{numinator: number, denominator: number}}
 */
const calc = postfixArr => {
    let result = {
        numinator: null,
        denominator: null
    };
    let stack = [];

    postfixArr.forEach(item => {
        if (item.operator) {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(OPERATORS[item.operator].method(x, y));
        } else {
            stack.push(item);
        }
    });
    result = stack.pop();
    return result;
};

const calculate = infix => calc(transformToPostFix(infix));

export { calculate };
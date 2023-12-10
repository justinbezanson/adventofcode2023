"use strict";

//https://adventofcode.com/2023/day/3

/**
 * @typedef {Array.<string[]>} Matrix
 */

/**
 * @typedef {Object} Position
 * @property {number} x 
 * @property {number} y
 */

/**
 * @typedef {Object} Gear
 * @property {string} gearKey
 * @property {number[]} partNumbers
 */

/**
 * @typedef {Object.<string, Gear>} Gears
 */

/** @type {Position} */
const EMPTYPOS = { x: -99, y: -99 };

main();

function main() {
    /** @type {string} */
    let input = require('./input.js');
    let matrix = inputToMatrix(input);
    let currentNumber = '';
    /** @type {Position} */
    let currentNumberAdjacentGear = EMPTYPOS;
    let sum = 0;
    /** @type {Gears} */
    let gears = {};

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(isNumber(matrix[i][j])) {
                let pos = isAdjacentToGear(matrix, i, j);
                currentNumber += matrix[i][j];

                if(!isEmptyPosition(pos)) {
                    currentNumberAdjacentGear = pos;
                }
            } else if(currentNumber !== '') {
                if(!isEmptyPosition(currentNumberAdjacentGear)) {
                    gears = appendPartNumberToGears(gears, currentNumberAdjacentGear, parseInt(currentNumber));
                }

                currentNumber = '';
                currentNumberAdjacentGear = EMPTYPOS;
            }
        }
    }

    sum = sumGears(gears);

    console.log(sum);
}

/**
 * 
 * @param {Gears} gears 
 * @returns {number}
 */
function sumGears(gears) {
    let sum = 0;

    for(let key in gears) {
        let gear = gears[key];

        if(gear.partNumbers.length === 2) {
           sum += (gear.partNumbers[0] * gear.partNumbers[1]);
        }
    };

    return sum;
}

/**
 * is this an empty position?
 * 
 * @param {Position} pos 
 * @returns {boolean}
 */
function isEmptyPosition(pos) {
    return pos.x === EMPTYPOS.x && pos.y === EMPTYPOS.y;
}

/**
 * append number to gears
 * 
 * @param {Gears} gears 
 * @param {Position} gearPosition 
 * @param {number} number 
 * @returns {Gears}
 */
function appendPartNumberToGears(gears, gearPosition, number) {
    if(isEmptyPosition(gearPosition)) {
        return gears;
    }

    let key = getKeyFromPosition(gearPosition);

    if(!gears[key]) {
        /** @type {Gear} */
        let newGear = {
            gearKey: key, 
            partNumbers: []
        };

        gears[key] = newGear;
    }

    if(gears[key].partNumbers.indexOf(number) < 0) {
        gears[key].partNumbers.push(number);
    }

    return gears;
}

/**
 * generate key based on position coordinates
 * 
 * @param {Position} pos 
 * @returns {string}
 */
function getKeyFromPosition(pos) {
    if(isEmptyPosition(pos)) {
        throw new Error('position cannot be empty');
    }

    return pos.x.toString() + ':' + pos.y.toString();
}

/**
 * is character adjacent to a symbol?
 * 
 * @param {Matrix} matrix 
 * @param {number} i 
 * @param {number} j 
 * @returns {Position}
 */
function isAdjacentToGear(matrix, i, j) {
    /** @type {Array.<Position>} */
    let positions = [
        { x: i-1, y: j-1 },
        { x: i-1, y: j },
        { x: i-1, y: j+1 },
        { x: i, y: j-1 },
        { x: i, y: j+1 },
        { x: i+1, y: j-1 },
        { x: i+1, y: j },
        { x: i+1, y: j+1 }
    ];

    for(let k = 0; k < positions.length; k++) {
        if(isGear(matrix, positions[k].x, positions[k].y)) {
            return positions[k];
        }
    }

    return EMPTYPOS;
}

/**
 * is the character a gear?
 * 
 * @param {Matrix} matrix 
 * @param {number} i 
 * @param {number} j  
 * @returns {boolean}
 */
function isGear(matrix, i, j) {
    if(i < 0 || i >= matrix.length) {
        return false;
    }

    if(j < 0 || j >= matrix[i].length) {
        return false;
    }

    let char = matrix[i][j];
    return char === '*';
}

/**
 * is the character a number?
 * 
 * @param {string} char 
 * @returns {boolean}
 */
function isNumber(char) {
    return !isNaN(parseInt(char));
}

/**
 * split input into matrix
 * 
 * @param {string} input 
 * @returns {Matrix}
 */
function inputToMatrix(input) {
    /** @type {Matrix} */
    let matrix = [];

    input.split('\n').forEach(line => matrix.push(line.split('')));

    return matrix;
}
"use strict";

//https://adventofcode.com/2023/day/3

/**
 * @typedef {Array.<string[]>} Matrix
 */

main();

//TODO: check if number is adjact to a symbol
//      when finished, sum the pool

function main() {
    /** @type {string} */
    let input = require('./input.js');
    let matrix = inputToMatrix(input);
    let currentNumber = '';
    let currentNumberIsValid = false;
    let sum = 0;

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(isNumber(matrix[i][j])) {
                currentNumber += matrix[i][j];

                if(isAdjacent(matrix, i, j)) {
                    currentNumberIsValid = true;
                }
            } else if(currentNumber !== '') {
                if(currentNumberIsValid) {
                    sum += parseInt(currentNumber);
                }

                currentNumber = '';
                currentNumberIsValid = false;
            }
        }
    }

    console.log(sum);
}

/**
 * is character adjacent to a symbol?
 * 
 * @param {Matrix} matrix 
 * @param {number} i 
 * @param {number} j 
 * @returns {boolean}
 */
function isAdjacent(matrix, i, j) {
    return isSymbol(matrix, i-1, j-1) ||
        isSymbol(matrix, i-1, j) ||
        isSymbol(matrix, i-1, j+1) ||
        isSymbol(matrix, i, j-1) ||
        isSymbol(matrix, i, j+1) ||
        isSymbol(matrix, i+1, j-1) ||
        isSymbol(matrix, i+1, j) ||
        isSymbol(matrix, i+1, j+1);
}

/**
 * is the character a symbol?
 * 
 * @param {Matrix} matrix 
 * @param {number} i 
 * @param {number} j  
 * @returns {boolean}
 */
function isSymbol(matrix, i, j) {
    if(i < 0 || i >= matrix.length) {
        return false;
    }

    if(j < 0 || j >= matrix[i].length) {
        return false;
    }

    let char = matrix[i][j];
    return char !== '.' && !isNumber(char);
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
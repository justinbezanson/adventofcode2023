"use strict";

//https://adventofcode.com/2023/day/1

/** @type {string} */
let input = require('./1-input.js');
let lines = input.split('\n');
let sum = 0;

lines.forEach((line) => {
    let number = getLineNumbers(line);
    sum += number;
});

console.log(sum);

/**
 * evaluate each character of the line and 
 * combine the first digit and the last digit (in that order) 
 * to form a single two-digit number
 * 
 * @param {string} line 
 * @returns {number}
 */
function getLineNumbers(line) {
    let first = '';
    let last = '';

    for (let i = 0; i < line.length; i++) {
        let num = parseInt(line[i]);

        if(isNaN(num)) {
            continue;
        }

        if(first.length === 0) {
            first = line[i];
        } else {
            last = line[i];
        }
    }

    if(last.length === 0) {
        last = first;
    }

    return parseInt(first+last);
}
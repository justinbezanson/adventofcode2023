"use strict";

//https://adventofcode.com/2023/day/1#part2

/** @type {string} */
let input = require('./input.js');
let lines = input.split('\n');
let sum = 0;

for(let i = 0; i < lines.length; i++) {
    let number = getLineNumbers(lines[i]);
    sum += number;
}

console.log(sum);

/**
 * evaluate each character of the line and 
 * combine the first digit and the last digit (in that order) 
 * to form a single two-digit number
 * 
 * NOTE: numbers from 1 to 9 spelled out (i.e. "one" etc) also count
 * ALSO: "oneight" parses to 81
 * 
 * @param {string} line 
 * @returns {number}
 */
function getLineNumbers(line) {
    let first = '';
    let last = '';
    let firstIndex = -1;
    let lastIndex = -1;
    let search = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let index = -1;
    let largest = -1;

    search.forEach((term, termIndex) => {
        index = line.indexOf(term);
        largest = largestIndexOf(line, term);

        if(index > -1 && (firstIndex === -1 || index < firstIndex)) {
            firstIndex = index;
            first = termIndex < 9 ? (termIndex+1).toString() : search[termIndex];
        } 
        
        if(largest > -1 && largest > lastIndex) {
            lastIndex = largest;
            last = termIndex < 9 ? (termIndex+1).toString() : search[termIndex];
        }
    });

    if(last.length === 0) {
        last = first;
    }

    return parseInt(first+last);
}

/**
 * Get largest index of search term
 * 
 * @param {string} line 
 * @param {string} term 
 * @returns number
 */
function largestIndexOf(line, term) {
    let index = -1;
    let largest = -1;
    let first = true;

    while(index > -1 || first) {
        first = false;
        index = line.indexOf(term, ++index);
        if(index > largest) largest = index;
    }

    return largest;
}
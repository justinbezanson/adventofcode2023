"use strict";

//https://adventofcode.com/2023/day/4

/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string[]} winningNumbers
 * @property {string[]} myNumbers
 */

/** @type {string} */
let input = require('./input.js');
let cards = inputToCards(input);
let sum = 0;

cards.forEach(card => sum += getCardPoints(card));

console.log(sum);

/**
 * calculate the points of the card
 * 
 * @param {Card} card 
 * @returns {number}
 */
function getCardPoints(card) {
    let matches = 0;
    let points = 0;

    card.myNumbers.forEach((number) => {
        if(card.winningNumbers.indexOf(number) > -1) {
            matches++;
        }
    });

    for(let i = 0; i < matches; i++) {
        points = points === 0 ? 1 : (points * 2);
    }

    return points;
}

/**
 * parse input into cards array
 * 
 * @param {string} input 
 * @returns {Card[]}
 */
function inputToCards(input) {
    let lines = input.split('\n');
    
    /** @type {Card[]} */
    let cards = [];

    lines.forEach((line) => {
        /** @type {Card} */
        let card = {
            id: parseInt(line.split(':')[0].replace('Card ', '')),
            winningNumbers: line.split(':')[1].split('|')[0].trim().split(/\s+/),
            myNumbers: line.split(':')[1].split('|')[1].trim().split(/\s+/)
        };

        cards.push(card);
    });

    return cards;
}

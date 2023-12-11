"use strict";

//https://adventofcode.com/2023/day/4#part2

/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string[]} winningNumbers
 * @property {string[]} myNumbers
 * @property {number} copies
 */

/** @type {string} */
let input = require('./input.js');
let cards = inputToCards(input);
let sum = 0;

cards.forEach(card => sum += getCardCopies(card));

console.log(sum);


/**
 * return the number of copies of each card
 * 
 * @param {Card} card 
 * @returns {number}
 */
function getCardCopies(card) {
    let matches = 0;
    let index = card.id;

    card.myNumbers.forEach((number) => {
        if(card.winningNumbers.indexOf(number) > -1) {
            matches++;
        }
    });

    for(let j = 0; j < matches; j++) {
        cards[index].copies += card.copies;        
        index++;
    }

    return card.copies;
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
            myNumbers: line.split(':')[1].split('|')[1].trim().split(/\s+/),
            copies: 1
        };

        cards.push(card);
    });

    return cards;
}

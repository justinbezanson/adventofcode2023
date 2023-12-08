"use strict";

//https://adventofcode.com/2023/day/2

/**
 * @typedef {Object} Cubes 
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/**
 * @typedef {Object} Game 
 * @property {number} id
 * @property {Array.<Cubes>} rounds
 */

/** @type {Cubes} */
const CUBES = {
    red: 12,
    green: 13,
    blue: 14
}

/** @type {string} */
let input = require('./2-input.js');
let lines = input.split('\n');
/** @type {Array.<Game>} */
let games = [];

lines.forEach((line) => {
    games.push(lineToGame(line));
});

/** @type {Array.<Game>} */
let possibleGames = getPossibleGames(games);
let sum = sumGameIds(possibleGames);

console.log(sum);

/**
 * return the sum of the game ids
 * 
 * @param {Array.<Game>} games 
 * @returns {number}
 */
function sumGameIds(games) {
    let sum = 0;

    games.forEach(game => sum += game.id);

    return sum;
}

/**
 * return all games that are possible
 * 
 * @param {Array.<Game>} games 
 * @returns {Array.<Game>}
 */
function getPossibleGames(games) {
    /** @type {Array.<Game>} */
    let possible = [];

    games.forEach(game => { 
        if(isGamePossible(game)) {
            possible.push(game); 
        }
    });

    return possible;
}

/**
 * evaluate if game is possible
 * 
 * @param {Game} game 
 * @returns {boolean}
 */
function isGamePossible(game) {
    let colors = ['red', 'blue', 'green'];

    for(let i = 0; i < colors.length; i++) {
        let color = colors[i];

        for(let j = 0; j < game.rounds.length; j++) {
            let round = game.rounds[j];

            if(round[color] > CUBES[color]) {
                return false;
            }
        }
    }

    return true;
}

/**
 * convert a string into a Game object
 * 
 * @param {string} line 
 * @returns {Game} 
 */
function lineToGame(line) {
    /** @type {Game} */
    let game = {
        id: getGameId(line),
        rounds: getRounds(line)
    };

    return game;
}

/**
 * parse the rounds from the delimited string
 * 
 * @param {string} line 
 * @returns {Array.<Cubes>}
 */
function getRounds(line) {
    /** @type {string[]} */
    let raw = line.split(':')[1].split(';');
    /** @type {Array.<Cubes>} */
    let rounds = [];

    raw.forEach(rawItem => rounds.push(getRound(rawItem)));

    return rounds;    
}

/**
 * convert raw data into a Cubes object
 * 
 * @param {string} raw 
 * @returns {Cubes}
 */
function getRound(raw) {
    /** @type {Cubes} */
    let cubes = { red: 0, green: 0, blue: 0 };
    let parts = raw.split(',');

    parts.forEach((part) => {
        let [num, color] = part.trim().split(' ');
        cubes[color] = parseInt(num);
    });

    return cubes;
}

/**
 * get the game id from the line
 * 
 * @param {string} line 
 * @returns {number}
 */
function getGameId(line) {
    return parseInt(line.split(':')[0].replace('Game ', ''));
}


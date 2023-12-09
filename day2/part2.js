"use strict";

//https://adventofcode.com/2023/day/2#part2

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


/** @type {string} */
let input = require('./input.js');
let lines = input.split('\n');
let sum = 0;

lines.forEach((line) => {
    let minimumCubes = getMinimumForPossibleGame(lineToGame(line));
    sum += getPowerOfCubes(minimumCubes);
});

console.log(sum);

//TODO: get minimum number of each color for each game
//      get the power of each game
//      sum the powers

/**
 * calculate the power of the cubes
 * 
 * @param {Cubes} cubes 
 * @returns {number}
 */
function getPowerOfCubes(cubes) {
    return cubes.red * cubes.green * cubes.blue;
}

/**
 * get the minimum cubes for each color required to make the game possible
 * 
 * @param {Game} game 
 * @returns {Cubes}
 */
function getMinimumForPossibleGame(game) {
    let colors = ['red', 'green', 'blue'];
    
    /** @type {Cubes} */
    let cubes = {
        red: 0,
        green: 0,
        blue: 0
    };

    colors.forEach((color) => {
        game.rounds.forEach((round) => {
            if(round[color] > cubes[color]) {
                cubes[color] = round[color];
            }
        });
    });

    return cubes;
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


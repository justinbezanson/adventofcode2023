"use strict";

//https://adventofcode.com/2023/day/5

/**
 * @typedef {Object} MapLine
 * @property {number} destination
 * @property {number} source
 * @property {number} range
 */

/**
 * @typedef {Object} Map
 * @property {string} name
 * @property {MapLine[]} lines
 */

/** @type {string} */
let input = require('./input.js');
let lines = input.split('\n');
let seeds = getSeeds(lines[0]);
let maps = linesToMaps(lines);
let locations = seeds.map(seed => getLocation(seed, maps));

console.log(Math.min(...locations));

/**
 * get the location for the seed
 * 
 * @param {number} source 
 * @param {Map[]} maps 
 * @returns {number}
 */
function getLocation(source, maps) {
    let destination = source;

    maps.forEach(map => destination = getDestination(destination, map));

    return destination;
}

/**
 * get the destination of the map
 * 
 * @param {number} source 
 * @param {Map} map 
 * @returns {number}
 */
function getDestination(source, map) {
    let destination = source;

    for(let i = 0; i < map.lines.length; i++) {
        let line = map.lines[i];

        if(destination >= line.source && destination < line.source + line.range) {
            destination = destination + line.destination - line.source;

            if(source !== destination) {
                break;
            }
        }
    }

    return destination;
}

/**
 * parse out seed list
 * 
 * @param {string} line 
 * @returns {number[]}
 */
function getSeeds(line) {
    return lines[0].split(':')[1].trim().split(' ').map(str => { return parseInt(str); });
}

/**
 * parse lines into maps
 * 
 * @param {string[]} lines 
 * @returns {Map[]}
 */
function linesToMaps(lines) {
    /** @type {Map[]} */
    let maps = [];
    /** @type {Map} */
    let map;
    /** @type {MapLine} */
    let line;
    /** @type {string[]} */
    let parts;

    for(let i = 2; i < lines.length; i++) {
        if(lines[i].indexOf('map:') > -1) {
            map = {
                name: lines[i].replace(' map:', ''),
                lines: []
            }
        } else if(lines[i].length === 0) {
            maps.push(map);
        } else {
            parts = lines[i].split(' ');

            line = {
                destination: parseInt(parts[0]),
                source: parseInt(parts[1]),
                range: parseInt(parts[2])
            };

            map.lines.push(line);
        }
    }

    maps.push(map);

    return maps;
}

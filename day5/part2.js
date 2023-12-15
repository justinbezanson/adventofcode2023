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

/**
 * @typedef {Object} SeedRange 
 * @property {number} start
 * @property {number} length
 */

/** @type {string} */
let input = require('./input.js');
let lines = input.split('\n');
let seedRanges = getSeedRanges(lines[0]);
let maps = linesToMaps(lines);
let lowest = -1;

let locations = seedRanges.map(range => {
    let start = range.start;
    const len = start + range.length;

    while(start < len) {
        const location = getLocation(start, maps);
        if(location < lowest || lowest === -1) {
            lowest = location;
        }
        start++;
    }
});

console.log(lowest);

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
 * parse out seed ranges
 * 
 * @param {string} line 
 * @returns {SeedRange[]}
 */
function getSeedRanges(line) {
    const arr = lines[0].split(':')[1].trim().split(' ').map(str => { return parseInt(str); });
    const chunkSize = 2;
    const ranges = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        
        /** @type {SeedRange} */
        let range = {
            start: chunk[0],
            length: chunk[1]
        }

        ranges.push(range);
    }

    return ranges;
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

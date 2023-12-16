"use strict";

//https://adventofcode.com/2023/day/6#part2

/**
 * instance of a boat race
 */
class Race {
    /**
     * 
     * @param {string[]} lines 
     */
    constructor(lines) {
        this.duration = 0;
        this.distance = 0;
        this.winningRounds = 0;
        this.init(lines);
    }

    /**
     * initialize class values
     * 
     * @param {string[]} lines 
     */
    init(lines) {
        const timeParts = lines[0].split(':')[1].trim().split(/\s+/);
        const distanceParts = lines[1].split(':')[1].trim().split(/\s+/);

        this.setDuration(parseInt(timeParts.join('')));
        this.setDistance(parseInt(distanceParts.join('')));
    }

    /**
     * was this a winning distance?
     * 
     * @param {number} distance 
     * @returns {boolean}
     */
    isWinningRound(distance) {
        return distance > this.distance;
    }

    /**
     * compete in race using all variations
     */
    compete() {
        let speed = 0;
        while(speed < this.duration) {
            const remainingDuraction = this.duration - speed;
            const distance = speed * remainingDuraction;

            if(this.isWinningRound(distance)) {
                this.winningRounds++;
            }

            speed++;
        }
    }

    /**
     * get the number of winning rounds
     * 
     * @returns {number}
     */
    getWinningRounds() {
        return this.winningRounds;
    }
    
    /**
     * set race duration
     * @param {number} duration 
     */
    setDuration(duration) {
        this.duration = duration;
    }

    /**
     * set race distance
     * 
     * @param {number} distance 
     */
    setDistance(distance) {
        this.distance = distance;
    }

    /**
     * create races array from lines
     * 
     * @param {string[]} lines 
     * @returns {Race}
     */
    static CreateRace(lines) {
        const race = new Race(lines);    
        return race;
    }
}

/** @type {string} */
const input = require('./input.js');
const lines = input.split('\n');
const race = Race.CreateRace(lines);

race.compete();

console.log(race.getWinningRounds()); //answer: 32583852
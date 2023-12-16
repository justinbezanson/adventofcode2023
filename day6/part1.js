"use strict";

//https://adventofcode.com/2023/day/5

/**
 * instance of a boat race
 */
class Race {
    constructor() {
        this.duration = 0;
        this.distance = 0;
        this.winningRounds = 0;
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
     * @returns {Race[]}
     */
    static CreateRaces(lines) {
        /** @type {Race[]} */
        let races = [];

        lines.forEach((line) => {
            /** @type {number[]} */
            const parts = line.split(':')[1].trim().split(/\s+/).map(part => parseInt(part));

            parts.forEach((part, index) => {
                if(races[index] === undefined) {
                    let race = new Race();
                    race.setDuration(part);
                    races[index] = race;
                } else {
                    races[index].setDistance(part);
                }
            });
        });

        return races;
    }
}

/** @type {string} */
const input = require('./input.js');
const lines = input.split('\n');
const races = Race.CreateRaces(lines);
let marginOfError = 1;

races.forEach((race) => {
    race.compete();
    marginOfError *= race.getWinningRounds();
})

console.log(marginOfError); //answer: 1624896
"use strict";

//https://adventofcode.com/2023/day/7#part2

/**
 * representation of a hand with cards and a bid
 */
class Hand {
    static ORDER = 'J23456789TQKA';

    /**
     * 
     * @param {string} line 
     */
    constructor(line) {
        this.cards = line.split(' ')[0];
        this.bid = parseInt(line.split(' ')[1]);
        this.cardsArray = this.cards.split('');
        this.cardsArray.sort();
        this.jokers = this.getNumberOfJokers();
        this.rank = this.getRank();
    }

    /**
     * calculate the hand rank
     * 
     * @returns {number}
     */
    getRank() {
        if(this.isFiveOfAKind()) {
            return 7;
        }

        if(this.isFourOfAKind()) {
            return this.jokers > 0 ? 7 : 6;
        }

        if(this.isFullHouse()) {
            return this.jokers > 1 ? 7 : 5;
        }

        if(this.isThreeOfAKind()) {
            return this.jokers > 0 ? 6 : 4;
        }

        if(this.isTwoPair()) {
            if(this.jokers === 0) {
                return 3;
            }

            //full house
            if(this.jokers === 1) {
                return 5;
            }

            //four of kind
            return 6;
        }

        if(this.isOnePair()) {

            //three of a kind
            if(this.jokers > 0) {
                return 4;
            }

            return 2;
        }

        if(this.jokers > 0) {
            //one pair
            return 2;
        }

        return 1;
    }

    /**
     * get the number of jokers in the hand
     */
    getNumberOfJokers() {
        let jokers = 0;

        for(let i = 0; i < this.cardsArray.length; i++) {
            if(this.cardsArray[i] === 'J') {
                jokers++;
            }
        }

        return jokers;
    }

    /**
     * is this hand greater than the passed hand?
     * 
     * @returns {boolean}
     */
    isGreaterThan(handB) {
        if(this.rank === handB.rank) {
            for(let i = 0; i < this.cardsArray.length; i++) {
                if(Hand.ORDER.indexOf(this.cards.charAt(i)) === Hand.ORDER.indexOf(handB.cards.charAt(i))) {
                    continue;
                }

                return Hand.ORDER.indexOf(this.cards.charAt(i)) > Hand.ORDER.indexOf(handB.cards.charAt(i));
            }
        }

        return this.rank > handB.rank;
    }

    /**
     * is the hand five of a kind?
     * 
     * @returns {boolean}
     */
    isFiveOfAKind() {
        return this.cardsArray.join('') === this.combineNTimes(this.cardsArray[0], 5);
    }

    /**
     * is the hand four of a kind?
     * 
     * @returns {boolean}
     */
    isFourOfAKind() {
        return (this.cardsArray.join('').indexOf(this.combineNTimes(this.cardsArray[0], 4)) > -1) ||
            (this.cardsArray.join('').indexOf(this.combineNTimes(this.cardsArray[1], 4)) > -1)
    }

    /**
     * is the hand a full house?
     * 
     * @returns {boolean}
     */
    isFullHouse() {
        return this.isThreeOfAKind() && this.isTwoPair();
    }

    /**
     * is the hand three of a kind?
     * 
     * @returns {boolean}
     */
    isThreeOfAKind() {
        return (this.cardsArray.join('').indexOf(this.combineNTimes(this.cardsArray[0], 3)) > -1) ||
            (this.cardsArray.join('').indexOf(this.combineNTimes(this.cardsArray[1], 3)) > -1) ||
            (this.cardsArray.join('').indexOf(this.combineNTimes(this.cardsArray[2], 3)) > -1)
    }

    /**
     * is the hand two pair?
     * 
     * @returns {boolean}
     */
    isTwoPair() {
        let pairs = 0;
        let matches = [];
        let len = this.cardsArray.length;

        for(let i = 0; i < len-1; i++) {
            for(let j = 1; j < len; j++) {
                if(i === j) {
                    continue;
                }

                if(this.cardsArray[i] === this.cardsArray[j] && matches.indexOf(this.cardsArray[i]) === -1) {
                    matches.push(this.cardsArray[i]);
                    pairs++;
                    break;
                }
            }
        }
        
        return pairs > 1;
    }

    /**
     * is the hand one pair?
     * 
     * @returns {boolean}
     */
    isOnePair() {
        let len = this.cardsArray.length;

        for(let i = 0; i < len; i++) {
            for(let j = 1; j < len; j++) {
                if(i === j) {
                    continue;
                }

                if(this.cardsArray[i] === this.cardsArray[j]) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * combine the char n times into a string
     * 
     * @param {string} char 
     * @param {number} n 
     * @returns 
     */
    combineNTimes(char, n) {
        let str = '';

        for(let i = 0; i < n; i++) {
            str += char;
        }

        return str;
    }
}

/** @type {string} */
const input = require('./input.js');
const lines = input.split('\n');
let hands = lines.map(line => new Hand(line));
let winnings = 0;

hands.sort(function(a, b) {
    return a.isGreaterThan(b) ? 1 : -1;
});

hands.forEach((hand, index) => {
    winnings += (hand.bid * (index+1));
});

console.log(winnings); //251515496
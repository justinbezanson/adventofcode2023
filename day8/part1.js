"use strict";

//https://adventofcode.com/2023/day/8

/**
 * @typedef {Object} TreeNode 
 * @property {string} L 
 * @property {string} R
 */

/**
 * @typedef {Object<string, TreeNode>} Tree
 */

/** @type {string} */
const input = require('./input.js');
const lines = input.split('\n');
const tree = linesToTree(lines);
const directions = lines[0].split('');
let current = 'AAA';
let steps= 0;

while(current !== 'ZZZ') {
    for(const direction of directions) {
        current = tree[current][direction];
        steps++;
        if(current === 'ZZZ') {
            break;
        }
    }
}

console.log(steps);


/**
 * create tree from input lines
 * 
 * @param {string[]} lines 
 * @returns {Tree}
 */
function linesToTree(lines) {
    /** @type {Tree} */
    let tree = {};
    const len = lines.length;

    for(let i = 2; i < len; i++) {
        let parts = lines[i].split('=');
        let key = parts[0].trim();
        tree[key] = createTreeNode(parts[1]);
    }

    return tree;
}

/**
 * create a tree node from the input string
 * 
 * @param {string} input 
 * @returns {TreeNode}
 */
function createTreeNode(input) {
    input = input.replace('(', '').replace(')', '');
    let parts = input. split(',');
    /** @type {TreeNode} */
    let node = {
        L: parts[0].trim(),
        R: parts[1].trim()
    }

    return node;
}
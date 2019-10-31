'use strict';
const sentenceBoundaryDetection = require('sbd');
const fs = require('fs');

const MAXIMUM_SENTENCES = 7;
const CONTENT_FILE = './content.json';

module.exports = {

    textToArray: async text => {
        return text.split('\n');
    },

    removeBlankLines: async textArray => {
        return textArray.filter(line => line.trim().length > 0);
    },

    removeMarkdowns: async textArray => {
        return textArray.filter(line => !line.trim().startsWith('='));
    },

    removeDatesInParenthesis: async textArray => {
        return textArray.map(line => line.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '') );
    },

    arrayToText: async textArray => {
        return textArray.join(' ');
    },

    createSentencesFromText: async text => {
        return sentenceBoundaryDetection.sentences(text);
    },

    limitMaximumSentences: async sentences => {
        return sentences.slice(0, MAXIMUM_SENTENCES);
    },

    persist: async content => {
        const contentAsString = JSON.stringify(content, null, 2);
        return fs.writeFileSync(CONTENT_FILE, contentAsString);
    },

    load: async () => {
        const fileBuffer = fs.readFileSync(CONTENT_FILE, 'utf-8');
        return JSON.parse(fileBuffer);
    }

};
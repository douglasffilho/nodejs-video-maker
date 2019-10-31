'use strict';
const Constants = require('./Constants.json');
const sentenceBoundaryDetection = require('sbd');
const fs = require('fs');

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
        return sentences.slice(0, Constants.CONTENT_MAX_SENTENCES);
    },

    persist: async content => {
        const contentAsString = JSON.stringify(content, null, 2);
        return fs.writeFileSync(Constants.CONTENT_FILE, contentAsString);
    },

    load: async () => {
        try {
            const fileBuffer = fs.readFileSync(Constants.CONTENT_FILE, 'utf-8');
            return JSON.parse(fileBuffer);
        } catch (error) {
            return {};
        }
    }

};
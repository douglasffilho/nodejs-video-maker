const sentenceBoundaryDetection = require('sbd');
const MAXIMUM_SENTENCES = 7;

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
    }

};
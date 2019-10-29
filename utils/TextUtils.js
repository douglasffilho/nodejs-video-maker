const sentenceBoundaryDetection = require('sbd');

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
    }

};
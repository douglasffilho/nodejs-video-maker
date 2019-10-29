const AlgorithmiaService = require('../AlgorithmiaService.js');
const TextUtils = require('../../utils/TextUtils.js');

const log = message => {
    console.log(`TextRobot::Bi... Bop! ${message}`);
}

const fetchSourceToContent = async content => {
    log('Fetching source from Wikipedia');

    content.sourceContent = {
        original: await AlgorithmiaService.getWikipediaContent(content.searchTerm)
    };
}

const sanitizeContent = async content => {
    log('Sanitizing content');
    const textAsArray = await TextUtils.textToArray(content.sourceContent.original);
    const textArrayWithoutBlankLines = await TextUtils.removeBlankLines(textAsArray);
    const textArrayWithoutMarkdowns = await TextUtils.removeMarkdowns(textArrayWithoutBlankLines);
    const textWithDatesWithoutParenthesis = await TextUtils.removeDatesInParenthesis(textArrayWithoutMarkdowns);
    const sanitizedText = await TextUtils.arrayToText(textWithDatesWithoutParenthesis);
    
    content.sourceContent.sanitized = sanitizedText;
}

const createSentencesFromContent = async content => {
    log('Creating sentences from content');
    const sentences = await TextUtils.createSentencesFromText(content.sourceContent.sanitized);
    content.sentences = sentences.map(sentence => {
        return {
            text: sentence,
            keywords: [],
            images: []
        };
    });
}

module.exports = {

    bibop: async content => {
        log('Working... Bip!');

        await fetchSourceToContent(content);
        await sanitizeContent(content);
        await createSentencesFromContent(content);
    }

};
const AlgorithmiaService = require('../AlgorithmiaService.js');
const ContentUtils = require('../../utils/ContentUtils.js');
const WatsonNluService = require('../WatsonNluService.js');

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
    const textAsArray = await ContentUtils.textToArray(content.sourceContent.original);
    const textArrayWithoutBlankLines = await ContentUtils.removeBlankLines(textAsArray);
    const textArrayWithoutMarkdowns = await ContentUtils.removeMarkdowns(textArrayWithoutBlankLines);
    const textWithDatesWithoutParenthesis = await ContentUtils.removeDatesInParenthesis(textArrayWithoutMarkdowns);
    const sanitizedText = await ContentUtils.arrayToText(textWithDatesWithoutParenthesis);
    
    content.sourceContent.sanitized = sanitizedText;
}

const createSentencesFromContent = async content => {
    log('Creating sentences from content');
    const sentences = await ContentUtils.createSentencesFromText(content.sourceContent.sanitized);
    const limitedSentences = await ContentUtils.limitMaximumSentences(sentences);
    content.sentences = [];
    for (sentence of limitedSentences) {
        const keywords = await WatsonNluService.fetchKeywordsFromSentence(sentence);
        content.sentences.push({
            text: sentence,
            keywords: keywords,
            images: []
        });
    };
}

module.exports = {

    bibop: async () => {
        log('Working... Bip!');

        const content = await ContentUtils.load();

        await fetchSourceToContent(content);
        await sanitizeContent(content);
        await createSentencesFromContent(content);

        await ContentUtils.persist(content);
    }

};
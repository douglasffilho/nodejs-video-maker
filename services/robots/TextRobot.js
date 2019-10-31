'use strict';
const Robot = require('./Robot.js');
const AlgorithmiaService = require('../AlgorithmiaService.js');
const ContentUtils = require('../../utils/ContentUtils.js');
const WatsonNluService = require('../WatsonNluService.js');
const Constants = require('../../utils/Constants.json');

class TextRobot extends Robot {

    constructor() {
        super('TextRobot');
    }

    async fetchSourceToContent(content) {
        this.log('Fetching source from Wikipedia');
    
        content.sourceContent = {
            original: await AlgorithmiaService.getWikipediaContent(content.searchTerm)
        };
    }
    
    async sanitizeContent(content) {
        this.log('Sanitizing content');
        const textAsArray = await ContentUtils.textToArray(content.sourceContent.original);
        const textArrayWithoutBlankLines = await ContentUtils.removeBlankLines(textAsArray);
        const textArrayWithoutMarkdowns = await ContentUtils.removeMarkdowns(textArrayWithoutBlankLines);
        const textWithDatesWithoutParenthesis = await ContentUtils.removeDatesInParenthesis(textArrayWithoutMarkdowns);
        const sanitizedText = await ContentUtils.arrayToText(textWithDatesWithoutParenthesis);
        
        content.sourceContent.sanitized = sanitizedText;
    }
    
    async createSentencesFromContent(content) {
        this.log('Creating sentences from content');
        const sentences = await ContentUtils.createSentencesFromText(content.sourceContent.sanitized);
        const limitedSentences = await ContentUtils.limitMaximumSentences(sentences);
        content.sentences = [];
        for (const sentence of limitedSentences) {
            const keywords = await WatsonNluService.fetchKeywordsFromSentence(sentence);
            const filteredKeywords = keywords.filter(
                keyword => !Constants.KEYWORD_BLACKLIST.includes(keyword)
            );
            content.sentences.push({
                text: sentence,
                keywords: filteredKeywords,
                images: [],
                googleSearchQuery: ''
            });
        };
    }

    async execute(content) {

        await this.fetchSourceToContent(content);
        await this.sanitizeContent(content);
        await this.createSentencesFromContent(content);

    }

}

module.exports = TextRobot;
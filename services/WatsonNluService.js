const { apikey } = require('../credentials/watson-nlu.json');
const { url } = require('../credentials/watson-nlu.json');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey }),
    version: '2018-04-05',
    url
});

module.exports = {

    fetchKeywordsFromSentence: async sentence => {
        try {
            const response = await nlu.analyze({
                text: sentence,
                features: {
                keywords: {}
                }
            });
            if (response.status === 200 && response.result.keywords) {
                return response.result.keywords.map(keyword => keyword.text);
            }

            return [];
        } catch (error) {
            console.log('error: ', error);
            return [];
        }
    }

};
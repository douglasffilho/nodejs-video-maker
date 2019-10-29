const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey;

module.exports = {

    getWikipediaContent: async searchTerm => {
        const authenticatedAlgorithmia = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = authenticatedAlgorithmia.algo("web/WikipediaParser/0.1.2");
        const wikipediaResponse = await wikipediaAlgorithm.pipe(searchTerm);
        
        if (wikipediaResponse.status === 200 && !wikipediaResponse.error) {
            return wikipediaResponse.result.content;
        }

        return '';
    }

};
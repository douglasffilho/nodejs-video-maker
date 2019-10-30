const algorithmia = require('algorithmia');
const { apikey } = require('../credentials/algorithmia.json');
const { url } = require('../credentials/algorithmia.json');

module.exports = {

    getWikipediaContent: async searchTerm => {
        const authenticatedAlgorithmia = algorithmia(apikey);
        const wikipediaAlgorithm = authenticatedAlgorithmia.algo(url);
        const wikipediaResponse = await wikipediaAlgorithm.pipe(searchTerm);
        
        if (wikipediaResponse.status === 200 && !wikipediaResponse.error) {
            return wikipediaResponse.result.content;
        }

        return '';
    }

};
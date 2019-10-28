const readline = require('readline-sync');

module.exports = {

    askUserForSearchTerm: () => {
        return readline.question('Type a Wikipedia search term: ');
    },

    askUserForPrefix: () => {
        const prefixes = ['Who is', 'What is', 'The history of'];
        const index = readline.keyInSelect(prefixes, 'Select a prefix to build the video');
        
        return prefixes[index];
    }

};
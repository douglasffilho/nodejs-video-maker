const UserInputService = require('./UserInputService.js');

const robots = [
    require('./robots/TextRobot.js')
]

module.exports = {

    execute: async content => {
        content.searchTerm = UserInputService.askUserForSearchTerm();
        content.prefix = UserInputService.askUserForPrefix();
        
        for (const robot of robots) {
            await robot.bibop(content);
        };
    }

};
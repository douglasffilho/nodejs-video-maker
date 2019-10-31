const UserInputService = require('../UserInputService.js');
const ContentUtils = require('../../utils/ContentUtils.js');

const log = message => {
    console.log(`InputRobot::Bi... Bop! ${message}`);
}

module.exports = {

    bibop: async () => {
        log('Working...');
        
        const content = await ContentUtils.load();

        content.searchTerm = UserInputService.askUserForSearchTerm();
        content.prefix = UserInputService.askUserForPrefix();
        
        await ContentUtils.persist(content);
    }

};
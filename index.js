const UserInputService = require('./services/UserInputService.js');
const RobotsService = require('./services/RobotsService.js');

const start = async () => {
    const content = {};

    content.searchTerm = UserInputService.askUserForSearchTerm();
    content.prefix = UserInputService.askUserForPrefix();

    await RobotsService.textRobotBiBop(content);
}

start();
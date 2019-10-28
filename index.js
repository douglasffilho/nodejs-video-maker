const UserInputService = require('./services/UserInputService.js');

const start = () => {
    const content = {};
    content.searchTerm = UserInputService.askUserForSearchTerm();
    content.prefix = UserInputService.askUserForPrefix();

    console.log(content);
}

start();
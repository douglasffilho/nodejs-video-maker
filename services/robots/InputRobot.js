'use strict';
const Robot = require('./Robot.js');
const UserInputService = require('../UserInputService.js');

class InputRobot extends Robot {

    constructor() {
        super('InputRobot');
    }

    async execute(content) {
        content.searchTerm = UserInputService.askUserForSearchTerm();
        content.prefix = UserInputService.askUserForPrefix();
    }

}

module.exports = InputRobot;
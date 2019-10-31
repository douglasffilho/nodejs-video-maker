'use strict';
const InputRobot = require('./robots/InputRobot.js');
const TextRobot = require('./robots/TextRobot.js');

const robots = [
    new InputRobot(),
    new TextRobot()
]

module.exports = {

    execute: async () => {
        for (const robot of robots) {
            await robot.bibop();
        };
    }

};
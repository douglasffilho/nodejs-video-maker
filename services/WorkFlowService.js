'use strict';
const InputRobot = require('./robots/InputRobot.js');
const TextRobot = require('./robots/TextRobot.js');
const ImagesRobot = require('./robots/ImagesRobot.js');

const robots = [
    new InputRobot(),
    new TextRobot(),
    new ImagesRobot()
]

module.exports = {

    execute: async () => {
        for (const robot of robots) {
            await robot.bibop();
        };
    }

};
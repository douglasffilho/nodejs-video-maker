'use strict';
const InputRobot = require('./robots/InputRobot.js');
const TextRobot = require('./robots/TextRobot.js');
const ImagesRobot = require('./robots/ImagesRobot.js');
const VideoRobot = require('./robots/VideoRobot.js');

const robots = [
    new InputRobot(),
    new TextRobot(),
    new ImagesRobot(),
    new VideoRobot()
]

module.exports = {

    execute: async () => {
        for (const robot of robots) {
            await robot.bibop();
        };
    }

};
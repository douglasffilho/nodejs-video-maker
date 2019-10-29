const TextRobot = require('./robots/TextRobot.js');

module.exports = {

    textRobotBiBop: async content => {
        await TextRobot.bibop(content);
    }

};
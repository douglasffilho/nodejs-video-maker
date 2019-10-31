const robots = [
    require('./robots/InputRobot.js'),
    require('./robots/TextRobot.js')
]

module.exports = {

    execute: async () => {
        for (const robot of robots) {
            await robot.bibop();
        };
    }

};
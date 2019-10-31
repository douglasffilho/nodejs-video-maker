'use strict';
const ContentUtils = require('../../utils/ContentUtils.js');

class Robot {
    
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`${this.name}::Bi... Bop! ${message}`);
    }

    async bibop() {
        this.log('Working... Bip!');
        const content = await ContentUtils.load();

        await this.execute(content);

        await ContentUtils.persist(content);
    }

}

module.exports = Robot;
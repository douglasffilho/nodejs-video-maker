'use strict';
const Robot = require('./Robot.js');
const gm = require('gm').subClass({imageMagick: true});

class VideoRobot extends Robot {

    constructor() {
        super('VideoRobot');
    }

    async createSentenceForImage(sentenceIndex, sentenceText) {
        return new Promise((resolve, reject) => {
            const outputFile = `./content/${sentenceIndex}_sentence.png`;
            const templateSettings = {
                0: {
                    size: '1920x400',
                    gravity: 'center'
                },
                1: {
                    size: '1920x1080',
                    gravity: 'center'
                },
                2: {
                    size: '800x1080',
                    gravity: 'west'
                },
                3: {
                    size: '1920x400',
                    gravity: 'center'
                },
                4: {
                    size: '1920x1080',
                    gravity: 'center'
                },
                5: {
                    size: '800x1080',
                    gravity: 'west'
                },
                6: {
                    size: '1920x400',
                    gravity: 'center'
                }
            };

            gm()
                .out('-size', templateSettings[sentenceIndex].size)
                .out('-gravity', templateSettings[sentenceIndex].gravity)
                .out('-background', 'transparent')
                .out('-fill', 'white')
                .out('-kerning', '-1')
                .out(`caption:${sentenceText}`)
                .write(outputFile, (error) => {
                if (error) {
                    return reject(error);
                }
                    resolve();
                })
        });
    }

    async createSentencesForImages(content) {
        for (const [sentenceIndex, sentence] of content.sentences.entries()) {
            try {
                await this.createSentenceForImage(sentenceIndex, sentence.text);
            } catch (error) {
                this.log(error);
            }
        };
    }

    async createYoutubeThumbnail() {
        return new Promise((resolve, reject) => {
            gm()
                .in('./content/0_0_improved.png')
                .write('./content/youtube-thumbnail.jpg', (error) => {
                if (error) {
                    return reject(error);
                }
                    resolve();
                });
        });
    }

    async execute(content) {
        await this.createSentencesForImages(content);
        await this.createYoutubeThumbnail();
    }

}

module.exports = VideoRobot;
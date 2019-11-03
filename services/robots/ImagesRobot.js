'use strict';
const Robot = require('./Robot.js');
const { apikey } = require('../../credentials/serp-api.json');
const GSR = require('google-search-results-nodejs');
const Constants = require('../../utils/Constants.json');
const ImageDownloader = require('image-downloader');
const gm = require('gm').subClass({imageMagick: true});

class ImagesRobot extends Robot {

    constructor() {
        super('ImagesRobot');
        this.downloadedImages = [];
    }

    fetchSearchImagesResults(searchQuery) {
        this.log(`Fetching search results for: ${searchQuery}`);
        const parameter = {
            engine: "google",
            q: searchQuery,
            location: "United States",
            google_domain: "google.com",
            gl: "us",
            hl: "en",
            filter: "0",
            no_cache: "true",
            tbm: "isch",
        };

        return new Promise((resolve, reject) => {
            try {
                const client = new GSR.GoogleSearchResults(apikey);
                client.json(parameter, (data) => {
                    if (!data || !data.search_metadata || data.search_metadata.status !== 'Success') {
                        return reject(`Images request error for ${JSON.stringify(parameter)}`);
                    }
                    resolve(
                        data.images_results
                            .map(image => image.original)
                            .slice(0, Constants.CONTENT_SENTENCE_MAX_IMAGES)
                    );
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    async downloadImage(imageReference, sentenceIndex, imageIndex) {
        const imageName = `${sentenceIndex}_${imageIndex}_original.png`
        if (this.downloadedImages.includes(imageReference)) {
            throw new Error(`Image ${imageReference} already downloaded`);
        } else {
            const downloadOptions = {
                url: imageReference,
                dest: `${Constants.CONTENT_FOLDER}/${imageName}`
            };
            await ImageDownloader.image(downloadOptions);
            this.log(`Downloaded image: ${imageReference}`);
            this.downloadedImages.push(imageReference);
        }
    }

    async improveImage(sentenceIndex, imageIndex) {
        return new Promise((resolve, reject) => {
            const inputFile = `./content/${sentenceIndex}_${imageIndex}_original.png[0]`;
            const outputFile = `./content/${sentenceIndex}_${imageIndex}_improved.png`;
            const width = 1920;
            const height = 1080;

            gm()
                .in(inputFile)
                .out('(')
                    .out('-clone')
                    .out('0')
                    .out('-background', 'white')
                    .out('-blur', '0x9')
                    .out('-resize', `${width}x${height}^`)
                .out(')')
                .out('(')
                    .out('-clone')
                    .out('0')
                    .out('-background', 'white')
                    .out('-resize', `${width}x${height}`)
                .out(')')
                .out('-delete', '0')
                .out('-gravity', 'center')
                .out('-compose', 'over')
                .out('-composite')
                .out('-extent', `${width}x${height}`)
                .write(outputFile, (error) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                });
        });
    }

    async fetchImages(content) {
        for (const sentence of content.sentences) {
            try {
                const query = `${content.searchTerm} ${sentence.keywords[0]}`
                sentence.images = await this.fetchSearchImagesResults(query);
                sentence.googleSearchQuery = query;
            } catch (error) {
                this.log(error);
            }
        }
    }

    async downloadImages(content) {
        for (const [sentenceIndex, sentence] of content.sentences.entries()) {
            for (const [imageIndex, image] of sentence.images.entries()) {
                try {
                    await this.downloadImage(image, sentenceIndex, imageIndex);
                    break;
                } catch (error) {
                    this.log(error);
                }
            }
        }
    }

    async improveImages(content) {
        for (const [sentenceIndex, sentence] of content.sentences.entries()) {
            for (const [imageIndex, image] of sentence.images.entries()) {
                try {
                    await this.improveImage(sentenceIndex, imageIndex);
                } catch (error) {
                    this.log(error);
                }
            }
        }
    }

    async execute(content) {
        await this.fetchImages(content);
        await this.downloadImages(content);
        await this.improveImages(content);
    }

}

module.exports = ImagesRobot;
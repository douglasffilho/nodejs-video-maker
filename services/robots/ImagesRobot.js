'use strict';
const Robot = require('./Robot.js');
const { apikey } = require('../../credentials/serp-api.json');
const GSR = require('google-search-results-nodejs');
const Constants = require('../../utils/Constants.json');
const ImageDownloader = require('image-downloader');

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

    async downloadImage(imageReference) {
        if (this.downloadedImages.includes(imageReference)) {
            throw new Error(`Image ${imageReference} already downloaded`);
        } else {
            const downloadOptions = {
                url: imageReference,
                dest: Constants.CONTENT_FOLDER
            };
            await ImageDownloader.image(downloadOptions);
            this.log(`Downloaded image: ${imageReference}`);
            this.downloadedImages.push(imageReference);
        }
    }

    async execute(content) {
        for (const sentence of content.sentences) {
            try {
                const query = `${content.searchTerm} ${sentence.keywords[0]}`
                sentence.images = await this.fetchSearchImagesResults(query);
                sentence.googleSearchQuery = query;
                for (const image of sentence.images) {
                    try {
                        await this.downloadImage(image);
                        break;
                    } catch (error) {
                        this.log(error);
                    }
                }

            } catch (error) {
                this.log(error);
            }
        }
    }

}

module.exports = ImagesRobot;
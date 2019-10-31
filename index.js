'use strict';
const WorkFlowService = require('./services/WorkFlowService.js');

const start = async () => {
    await WorkFlowService.execute();
}

start();
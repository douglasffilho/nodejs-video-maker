const WorkFlowService = require('./services/WorkFlowService.js');
const ContentUtils = require('./utils/ContentUtils.js');

const start = async () => {
    await ContentUtils.persist({});

    await WorkFlowService.execute();
}

start();
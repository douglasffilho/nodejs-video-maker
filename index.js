const WorkFlowService = require('./services/WorkFlowService.js');

const start = async () => {
    const content = {};

    await WorkFlowService.execute(content);
    
    console.log(content);
}

start();
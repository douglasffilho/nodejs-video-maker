const WorkFlowService = require('./services/WorkFlowService.js');

const start = async () => {
    const content = {};

    await WorkFlowService.execute(content);
    
    console.log(JSON.stringify(content, null, 2));
}

start();
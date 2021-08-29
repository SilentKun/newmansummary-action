const core = require('@actions/core');
const newman = require('newman');

const apiBase = 'https://api.getpostman.com';

try {
    const apiKey = core.getInput('postmanApiKey');
    const collection = core.getInput('collection');
    const environment = core.getInput('environment');
    newman.run({
        collection: `${apiBase}/collections/${collection}?apikey=${apiKey}`,
        environment: `${apiBase}/environments/${environment}?apikey=${apiKey}`,
        reporters:  ['htmlextra'],
        reporter: {
          htmlextra: {
              export: 'testResults/htmlreport.html',
              timezone: "Europe/Moscow"
          }
        }
      })
      .on('start', (err, args) => {
        console.log('running a collection...');
      }).on('done', (err, summary) => {
        core.setOutput("summary", `Total: ${summary.run.stats.assertions.total} Failed: ${summary.run.stats.assertions.failed}`);
      });
} catch (error) {
  core.setFailed(error.message);
}
const core = require('@actions/core');
const newman = require('newman');

try {
    const apiKey = core.getInput('postmanApiKey');
    newman.run({
        collection: `https://api.getpostman.com/collections/15577376-13df1f74-81bd-4c80-a23a-aba31f0016a7?apikey=${apiKey}`,
        environment: `https://api.getpostman.com/environments/15577376-572498e7-3163-4eed-9b8d-191fbbad90f0?apikey=${apiKey}`,
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
        ("summary", JSON.stringify(summary.run.stats));
      });
} catch (error) {
  core.setFailed(error.message);
}
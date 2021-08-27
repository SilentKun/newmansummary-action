const core = require('@actions/core');
const newman = require('newman');

try {
    newman.run({
        collection: 'https://api.getpostman.com/collections/15577376-13df1f74-81bd-4c80-a23a-aba31f0016a7?apikey=PMAK-6127edbcffa99200347d31a0-e6ff17b0e53da0faf885390df4edc9da78', //Add Postman collection path here
        environment: 'https://api.getpostman.com/environments/15577376-572498e7-3163-4eed-9b8d-191fbbad90f0?apikey=PMAK-6127edbcffa99200347d31a0-e6ff17b0e53da0faf885390df4edc9da78', //Add postman enviroment file path here 
        reporters:  ['htmlextra'],
        reporter: {
          htmlextra: {
              export: 'testResults/htmlreport.html',
              timezone: "Russia/Moscow"
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
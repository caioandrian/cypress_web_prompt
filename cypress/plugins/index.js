/// <reference types = "cypress"/>

const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const exec = require('child_process').execSync;
const fs = require('fs-extra');
const path = require('path');
const { mergeFiles } = require('junit-report-merger');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(
    './cypress/config-files',
    `${file}.json`
  );

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      //launchOptions.args.push("--incognito");
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    if (browser.name == 'chrome') {
      launchOptions.args.push('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');
      launchOptions.args.push('--disable-gpu');
    }

    /*if (browser.name === 'electron') {                
      launchOptions.preferences.incognito = true
    }*/
 
    return launchOptions;
  });

  on('before:run', async (details) => {  
    await beforeRunHook(details);  
    await exec("node ./cypress/support/clear.js");
  });

  on('after:run', async (results) => {
    if (results) {
      fs.mkdirSync('cypress/run', { recursive: true });
      await fs.writeFile('cypress/run/results.json', JSON.stringify(results));
    }

    const junitDir = path.join('cypress', 'reports', 'junit');
    const dest = path.join('cypress', 'reports', 'junitreport.xml');
    if (await fs.pathExists(junitDir)) {
      const hasXml = (await fs.readdir(junitDir)).some((f) => f.endsWith('.xml'));
      if (hasXml) {
        await new Promise((resolve, reject) => {
          mergeFiles(
            dest,
            [path.join(junitDir, '*.xml')],
            {},
            (err) => (err ? reject(err) : resolve())
          );
        });
      }
    }

    await afterRunHook();
  });

  const file = config.env.fileConfig || 'hmg';
  return getConfigurationByFile(file);
};
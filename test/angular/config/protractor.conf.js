// An example protractor configuration file.
exports.config = {
  // The address of a running selenium server.
  // Normal selenium + chrome e2e testing
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  /*
  //PhantomJS webdriver
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'phantomjs'
  },
  */

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['../e2e/defaultScenario.js'],

  baseUrl: 'http://localhost:3000',

  onPrepare: function() {
    //nothing yet
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
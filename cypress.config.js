const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',
    retries: {
      runMode: 1
    },
    specPattern: 'cypress/integration/**/*.js',
    viewportHeight: 1080,
    viewportWidth: 1920,
    pageLoadTimeout: 99000,
    defaultCommandTimeout: 99000,
    responseTimeout: 3000,
    chromeWebSecurity: false,
    waitForAnimations: true,
    supportFile: 'cypress/support/index.js',
    numTestsKeptInMemory: 1
  }

});

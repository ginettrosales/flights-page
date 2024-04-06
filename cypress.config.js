const { defineConfig } = require("cypress");

module.exports = defineConfig({
  trashAssetsBeforeRuns: true,
  video: true,
  videoCompression: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    useInlineDiffs: true,
    reportDir: 'cypress/results',
    reportPageTitle: 'Flights page results',
    reportFilename: 'results_[datetime]',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
    timestamp: "mmddyyyy_HHMMss",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'domain',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});

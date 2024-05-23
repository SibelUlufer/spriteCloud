import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json"
  },
  env: {
    baseApiUrl: 'https://petstore.swagger.io/v2',
    baseUiUrl: 'http://www.uitestingplayground.com/',
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});

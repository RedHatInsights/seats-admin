import { defineConfig } from "cypress";

const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress/config", `${file}.env.json`);
  if (!fs.existsSync(pathToConfigFile)) {
    throw new Error(`Config file ${pathToConfigFile} does not exist`);
  }

  return fs.readJson(pathToConfigFile);
}

export default defineConfig({
  retries: {
    runMode: 3,
    openMode: 0,
  },
  videoUploadOnPasses: false,  
  viewportWidth: 1600,
  viewportHeight: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || "stage";
      return getConfigurationByFile(file);      
    },
  },
});

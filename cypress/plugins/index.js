/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const convertPdfToPng = require("../support/pdfToPng");

module.exports = (on, config) => {
  on("task", {
    async debugPromises(sleepDuration) {
      const resolvesAfterSleepDuration = new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve();
        }, sleepDuration);
      });

      console.log("before sleep: " + sleepDuration + "ms");
      await resolvesAfterSleepDuration;
      console.log("after sleep");
      return "hello this is the return of the task, we're done waiting now 😃";
    },











    

    async convertPdfToPng() {
      await convertPdfToPng()

      return "Pdf converted!"
    }
  });
};

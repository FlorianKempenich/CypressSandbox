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
const resemble = require("resemblejs");
// : dloyarn upgrade cypress@5.3.0pen(/Users/floriankempenich/Work/Codurance/Dev/Learning/CypressSandbox/node_modules/canvas/build/Release/canvas.node, 1): no suitable image found.  Did find:
// 	/Users/floriankempenich/Work/Codurance/Dev/Learning/CypressSandbox/node_modules/canvas/build/Release/canvas.node: code signature in (/Users/floriankempenich/Work/Codurance/Dev/Learning/CypressSandbox/node_modules/canvas/build/Release/canvas.node) not valid for use in process using Library Validation: mapped file has no cdhash, completely unsigned? Code has to be at least ad-hoc signed.
//     at pr

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
      await convertPdfToPng();
      return "Pdf converted!";
    },

    compareImages({ img1Id, img2Id }) {
      const folder = "./imagesToCompare";
      const path = (imgId) => folder + "/" + imgId + ".png";
      const outputFile = (img1Id, img2Id, ignoredBoxes) =>
        notEmpty(ignoredBoxes)
          ? `${folder}/diffBetween_${img1Id}-${img2Id}_ignoredBox.png`
          : `${folder}/diffBetween_${img1Id}-${img2Id}.png`;

      let comparisonPromiseResolve;
      const comparisonPromise = new Promise(
        (resolve) => (comparisonPromiseResolve = resolve)
      );

      resemble(path(img1Id))
        .compareTo(path(img2Id))
        .ignoreAntialiasing()
        .onComplete((result) => {
          console.log(
            `Image comparison complete between: ${img1Id} | ${img2Id}`
          );
          comparisonPromiseResolve(result);
        });

      return comparisonPromise;
    },
  });
};

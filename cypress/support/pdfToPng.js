function inLocalDir(relativeFilePath) {
  return path.join(__dirname, relativeFilePath);
}

const path = require("path");
const { fromPath } = require("pdf2pic");
const pdfPath = inLocalDir("../../compass-report.pdf");

async function convertPdfToPng() {
  async function convertPage(pageNumber) {
    const options = {
      density: 1000,
      saveFilename: `compassReportPage_${pageNumber}`,
      savePath: inLocalDir("../../compassReportToPng"),
      format: "png",
      width: 1240,
      height: 1754,
    };
    const storeAsImage = fromPath(pdfPath, options);

    await storeAsImage(pageNumber);
    console.log(`Page ${pageNumber} has been converted to png`);
  }

  await convertPage(10);
  await convertPage(3);
}

module.exports = convertPdfToPng
const resemble = require("resemblejs");
const fs = require("fs");

const path = (imgId) => "./imgs/" + imgId + ".png";
const outputFile = (img1Id, img2Id, ignoredBoxes) =>
  notEmpty(ignoredBoxes)
    ? `./imgs/diffBetween_${img1Id}-${img2Id}_ignoredBox.png`
    : `./imgs/diffBetween_${img1Id}-${img2Id}.png`;
const percent = (pct) => pct / 100;

const notEmpty = (array) => array?.length;

function diffBetween(img1Id, img2Id, ignoredBoxes) {
  if (notEmpty(ignoredBoxes)) {
    resemble.outputSettings({ ignoredBoxes });
  }

  resemble(path(img1Id))
    .compareTo(path(img2Id))
    // .ignoreAntialiasing()
    .onComplete((result) => {
      console.log("--------------------------------------------");
      console.log("Results for: " + outputFile(img1Id, img2Id, ignoredBoxes));
      console.log(result);
      fs.writeFileSync(
        outputFile(img1Id, img2Id, ignoredBoxes),
        result.getBuffer()
      );
      console.log("--------------------------------------------");
      console.log("");
    });
}

diffBetween("square", "squareCopy");
diffBetween("square", "squareModified");

const ignoredBox = {
  left: 450,
  top: 550,
  right: 650,
  bottom: 700,
};
diffBetween("square", "squareModified", [ignoredBox]);

// diffBetween('compass', 'compassWrong')

// const coduranceCopyright = {
//   top: 1700,
//   right: 1200,
//   bottom: 1750,
//   left: 1020,
// }
// const lineAtBottom = {
//   top: 1750,
//   right: 1240,
//   bottom: 1754,
//   left: 0,
// }
// const compassIgnoredBoxes = [coduranceCopyright, lineAtBottom]
// 
// // diffBetween('compass', 'compassExpected')
// diffBetween('compass', 'compassExpected', compassIgnoredBoxes)
// diffBetween('compass', 'compassWrong', compassIgnoredBoxes)

// x: 330
// y: 370

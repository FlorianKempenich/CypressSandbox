const resemble = require("resemblejs");
const fs = require("fs");

const path = (imgId) => "./imgs/" + imgId + ".png";
const outputFile = (img1Id, img2Id, ignoredBox) =>
  ignoredBox
    ? `./imgs/diffBetween_${img1Id}-${img2Id}_ignoredBox.png`
    : `./imgs/diffBetween_${img1Id}-${img2Id}.png`;
const percent = (pct) => pct / 100;

function diffBetween(img1Id, img2Id, ignoredBox) {
  if (ignoredBox) {
    resemble.outputSettings({
      ignoredBoxes: [ignoredBox],
    });
  }

  resemble(path(img1Id))
    .compareTo(path(img2Id))
    .onComplete((result) => {
      console.log("--------------------------------------------");
      console.log("Results for: " + outputFile(img1Id, img2Id, ignoredBox));
      console.log(result);
      fs.writeFileSync(
        outputFile(img1Id, img2Id, ignoredBox),
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
diffBetween("square", "squareModified", ignoredBox);

// x: 330
// y: 370

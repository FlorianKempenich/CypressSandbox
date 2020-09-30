const BlinkDiff = require("blink-diff");

function diffBetween(img1Id, img2Id) {
  const percent = (pct) => pct / 100;
  const outputFile = (img1Id, img2Id) => `diffBetween_${img1Id}-${img2Id}.png`;

  const diff = new BlinkDiff({
    imageAPath: "./" + img1Id + ".png",
    imageBPath: "./" + img2Id + ".png",
    blockOut: { x: 100, y: 100, width: 200, height: 100 },
    // cropImageA: { x:200, y:300, width:2000, height:1000 },
    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: percent(1),
    imageOutputPath: outputFile(img1Id, img2Id),
    debug: true,
  });

  diff.run(function (error, result) {
    if (error) {
      throw error;
    } else {
      console.log(result);
      console.log(diff.hasPassed(result.code) ? "Passed" : "Failed");
      console.log("Found " + result.differences + " differences.");
    }
  });
}

diffBetween("square", "squareCopy");
diffBetween("square", "squareModified");

const BlinkDiff = require('blink-diff');


var diff = new BlinkDiff({
  imageAPath: 'images/compassReportPage_10.10.png', // Use file-path
  imageBPath: 'images/expected.png',
  blockOut: { x:200, y:300, width:2000, height:1000 },
  // cropImageA: { x:200, y:300, width:2000, height:1000 },
  thresholdType: BlinkDiff.THRESHOLD_PERCENT,
  threshold: 0.01, // 1% threshold
  imageOutputPath: 'result.png'
});

diff.run(function (error, result) {
 if (error) {
    throw error;
 } else {
   console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
    console.log('Found ' + result.differences + ' differences.');
 }
});
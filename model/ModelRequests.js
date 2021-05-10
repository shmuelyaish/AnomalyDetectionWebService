const tseries = require("./timeseries.js");
const simple = require("./SimpleAnomalyDetector.js");
const hybrid = require("./HybridAnomalyDetector.js");

//reciveing csvs it calculates simple anomalies. Returns map of anomalies
function simpleAnomaly(trainPath, testPath) {
    var train = new tseries.TimeSeries(trainPath);
    var test = new tseries.TimeSeries(testPath);
    var sad = new simple.SimpleAnomalyDetector();
    sad.learnNormal(train);
    return sad.detect(test);
}
//reciveing csvs it calculates hybrid anomalies. Returns map of anomalies
function hybridAnomaly(trainPath, testPath) {
    var train = new tseries.TimeSeries(trainPath);
    var test = new tseries.TimeSeries(testPath);
    var had = new hybrid.HybridAnomalyDetector();
    had.learnNormal(train);
    return had.detect(test);
}
module.exports = { hybridAnomaly, simpleAnomaly };
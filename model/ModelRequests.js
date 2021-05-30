const tseries = require("./AnomalyDetectionLogic/timeseries.js");
const simple = require("./AnomalyDetectionLogic/SimpleAnomalyDetector.js");
const hybrid = require("./AnomalyDetectionLogic/HybridAnomalyDetector.js");

//changes it to a map divided into sections of continus anomalies
function turnToBetterMap(anomalies) {
    //create a new map, a better one
    var betterMap = new Map();
    var itr = anomalies.keys();
    //put keys of anomalies into better array
    for (let i = 0; i < anomalies.size; i++) {
        betterMap.set(itr.next().value, new Array());
    }
    //reset the iterator
    itr = anomalies.keys();
    //go over each key
    for (let i = 0; i < anomalies.size; i++) {
        //save the key
        let k = itr.next().value;
        //take the array of values in the attributes
        let values = anomalies.get(k);
        //checks if it's the first value
        let start = true;
        //create an array. It will hold two values, the start and end of continuas anomalies timesteps
        var arr = new Array();
        //go over all the timesteps
        for (let j = 0; j < values.length; j++) {
            //if it's the first one, then save the timestep
            if (start) {
                arr.push(values[j]);
                start = false;
                // if the next one isn't consecutive
            } else if (values[j - 1] + 1 != values[j]) {
                //then save the last value and push the continuas timestep array into the map
                arr.push(values[j - 1]);
                betterMap.get(k).push(arr);
                //reset to a new array and save this timestep as the start of it
                arr = new Array();
                arr.push(values[j]);
            }
            //if we're on the last value, save it as the second timestep and push it
            if (j == values.length - 1) {
                arr.push(values[j]);
                betterMap.get(k).push(arr);
            }
        }
    }
    //return the better map
    return betterMap;
}

/*
function attempt() {
    var vals = new Array();
    for (let i = 1; i <= 5; i++) {
        vals.push(i);
    }
    vals.push(17);
    for (let i = 20; i <= 23; i++) {
        vals.push(i);
    } 
    vals.push(60)
    var betterMap = new Map();
    betterMap.set("A", vals);
    var atts = new Array();
    atts.push("A");
    atts.push("B");
    atts.push("C");
    betterMap.set("B", new Array());
    vals = new Array();
    vals.push(7);
    betterMap.set("C", vals);
    return turnToBetterMap(betterMap);
}
*/

//reciveing csvs it calculates simple anomalies. Returns map of anomalies
function simpleAnomaly(trainPath, testPath) {
    var train = new tseries.TimeSeries(trainPath);
    var test = new tseries.TimeSeries(testPath);
    var sad = new simple.SimpleAnomalyDetector();
    sad.learnNormal(train);
    return turnToBetterMap(sad.detect(test));
}
//reciveing csvs it calculates hybrid anomalies. Returns map of anomalies
function hybridAnomaly(trainPath, testPath) {
    var train = new tseries.TimeSeries(trainPath);
    var test = new tseries.TimeSeries(testPath);
    var had = new hybrid.HybridAnomalyDetector();
    had.learnNormal(train);
    return turnToBetterMap(had.detect(test));
}
module.exports = { hybridAnomaly, simpleAnomaly };

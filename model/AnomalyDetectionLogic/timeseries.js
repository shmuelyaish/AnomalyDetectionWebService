//include basic_funcs.js
const basic = require("./basic_funcs.js");
//const fs = require('fs')
//const readline = require('readline');

class TimeSeries {
    constructor(CSVFileName) {
        /*
         * this.atts is attributes
         * this.ts is the time series colomn by colomn
         * this.byRow is the time series row by row
         * 
         */
        //read the file into array line by line
        var file = CSVFileName.split('\n').filter(Boolean);
        //save the attributes as this.atts
        this.atts = file[0].split(',');
        //create map by attribute and by rows
        this.ts = new Map();
        this.byRow = new Map();
        //set the attributes in the map
        for (let i = 0; i < this.atts.length; i++) {
            this.ts.set(this.atts[i], new Array());
        }
        //set the rows in the map
        for (let i = 0; i < file.length - 1; i++) {
            this.byRow.set(i, new Array());
        }
        //place everything in the maps
        for (let i = 1; i < file.length; i++) {
            const splitLine = file[i].split(',');

            for (let j = 0; j < splitLine.length; j++) {
                this.ts.get(this.atts[j]).push(parseFloat(splitLine[j]));
                this.byRow.get(i - 1).push(parseFloat(splitLine[j]));

            }
        }
    }
    //returns data at name
    getAttributeData(name) {
        return this.ts.get(name);
    }
    gettAttributes() {
        return this.atts;
    }
    //returns the size of a colomn
    getRowSize() {
        return this.ts.get(this.atts[0]).length;
    }
    getAttributesSize() {
        return this.atts.length;
    }
    //returns row j
    getRow(j) {
        return this.byRow.get(j);
    }
}
module.exports = { TimeSeries };
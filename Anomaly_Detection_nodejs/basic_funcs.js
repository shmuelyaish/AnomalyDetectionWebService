'use strict';

class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    f(x) {
        return this.a * x + this.b;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//calculates the avg of the array
function avg(arr) {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
        
    }
    return sum / arr.length;
}

function varience(arr) {
    var av = avg(arr);
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }
    return (sum / arr.length) - av * av;
}

//recieves x and y array and calculates the covarience
function cov(arrX, arrY) {
    var sum = 0;
    for (let i = 0; i < arrX.length; i++) {
        sum += arrX[i] * arrY[i];
    }
    sum /= arrX.length;
    return sum - avg(arrX) * avg(arrY);
}
//returns the pearson of two arrrays
function pearson(x, y) {
    return (cov(x, y) / (Math.sqrt(varience(x)) * Math.sqrt(varience(y))));
}

//takes two arrays and caculates the linear reg line
function linear_reg(x, y) {
    var a = cov(x, y) / varience(x);
    var b = avg(y) - a * avg(x);
    return new Line(a, b);
}
module.exports = { Line, Point, avg, varience, cov, pearson, linear_reg };
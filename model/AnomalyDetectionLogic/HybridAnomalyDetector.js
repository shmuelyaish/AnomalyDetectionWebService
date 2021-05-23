const basic = require("./basic_funcs.js");
const tseries = require("./timeseries.js");
const simple = require("./SimpleAnomalyDetector.js");
const ec = require('smallest-enclosing-circle');
class HybridAnomalyDetector extends simple.SimpleAnomalyDetector {
	//learnHelper(const TimeSeries& ts, float p/*pearson*/, string f1, string f2, Point ** ps)
	learnHelper(ts, p, f1, f2, x, y) {
		super.learnHelper(ts, p, f1, f2, x, y);
		if (p > 0.5 && p < this.threshold) {
			var circle = ec(x, y);
			var c = new simple.correlatedFeatures();
			c.feature1 = f1;
			c.feature2 = f2;
			c.corrlation = p;
			c.threshold = circle.r * 1.1;
			c.cx = circle.x;
			c.cy = circle.y;
			this.cf.push(c);
		}
	}
	//isAnomalous(float x, float y, correlatedFeatures c)
	isAnomalous(x, y, c) {
		var tempX = (c.cx - x) * (c.cx - x);
		var tempY = (c.cy - y) * (c.cy - y);
		var dist = Math.sqrt(tempX + tempY);
		return (c.corrlation >= this.threshold && super.isAnomalous(x, y, c)) ||
			(c.corrlation > 0.5 && c.corrlation < this.threshold && dist > c.threshold);
	}
}
module.exports = { HybridAnomalyDetector};
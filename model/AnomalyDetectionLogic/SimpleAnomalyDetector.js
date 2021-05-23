const basic = require("./basic_funcs.js");
const tseries = require("./timeseries.js");
//const Struct = (...keys) => ((...v) => keys.reduce((o, k, i, a, b, c, d) => { o[k] = v[i]; return o }, {}));
/*
class correlatedFeatures = Struct(
	'feature1', 'feature2',
	'corrlation',
	'lin_reg',
	'threshold',
	'cx', 'cy'
);
*/
class correlatedFeatures {
	constructor() {
		this.feature1 = '';
		this.feature2 = '';
		this.corrlation = 0;
		this.lin_reg = new basic.Line(0, 0);
		this.threshold = 0;
		this.cx = 0;
		this.cy = 0;
    }
}
class SimpleAnomalyDetector {
	constructor() {
		this.threshold = 0.9;
		this.cf = new Array();
	}
	//recieves points, arrays x and y; and a line, r1, and returns the threshold
	findThreshold(x, y, rl) {
		var max = 0;
		for (let i = 0; i < x.length; i++) {
			let d = Math.abs(y[i] - rl.f(x[i]));
			if (d > max) {
				max = d;
            }
		}
		return max;
	}
	//learnHelper(const TimeSeries& ts, float p/*pearson*/, string f1, string f2, Point** ps)
	learnHelper(ts, p, f1, f2, x, y) {
		if (p > this.threshold) {
			var r1 = basic.linear_reg(x, y);
			var c = new correlatedFeatures();
			c.feature1 = f1;
			c.feature2 = f2;
			c.corrlation = p;
			c.lin_reg = r1;
			c.threshold = this.findThreshold(x, y, r1) * 1.1;
			this.cf.push(c);
		}
	}
	learnNormal(ts) {
		var atts = ts.gettAttributes();
		var len = ts.getRowSize();
		var vals = new Array(atts.length);
		for (var i = 0; i < vals.length; i++) {
			vals[i] = new Array(len);
		}
		for (let i = 0; i < atts.length; i++) {
			let x = ts.getAttributeData(atts[i]);
			
			for (let j = 0; j < len; j++) {
				vals[i][j] = x[j];
            }
		}
		for (let i = 0; i < atts.length; i++) {
			let f1 = atts[i];
			let max = 0;
			let jMax = 0;
			for (let j = i + 1; j < atts.length; j++) {
				let p = Math.abs(basic.pearson(vals[i], vals[j]));
				if (p > max) {
					max = p;
					jMax = j;
                }
			}

			let f2 = atts[jMax];
			this.learnHelper(ts, max, f1, f2, ts.getAttributeData(f1), ts.getAttributeData(f2));
		}
	}
	//isAnomalous(float x, float y, correlatedFeatures c)
	isAnomalous(x, y, c) {
		return (Math.abs(y - c.lin_reg.f(x)) > c.threshold);
	}
	//instead of anomaly report, make map with atts as keys and arrays with timesteps as values
	detect(ts) {
		var anomReport = new Map();
		//put attribute for and arrays for timesteps
		var atts = ts.gettAttributes();
		for (let i = 0; i < atts.length; i++) {
			anomReport.set(atts[i], new Array());
		}
		for (let i = 0; i < this.cf.length; i++) {
			let x = ts.getAttributeData(this.cf[i].feature1);
			let y = ts.getAttributeData(this.cf[i].feature2);
			for (let j = 0; j < x.length; j++) {
				if (this.isAnomalous(x[j], y[j], this.cf[i])) {
					anomReport.get(this.cf[i].feature1).push(j + 1);
					anomReport.get(this.cf[i].feature2).push(j + 1);
                }
            }
		}
		return anomReport;
    }
}
module.exports = { SimpleAnomalyDetector, correlatedFeatures };
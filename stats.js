var waitTimes;
var Ratios;
var testTimes;
//Task Stats
function AverageWaitTime() {}
function MinWaitTime() {}
function MaxWaitTime() {}
function BottomMedWaitTime() {}
function TopMedWaitTime() {}
function MedianWaitTime(){}

function AverageRatio() {}
function MinRatio() {}
function MaxRatio() {}
function BottomMedRatio() {}
function TopMedRatio() {}
function MedianRatio(){}


//Test Stats
function AverageTestTime() {}
function MinTestTime() {}
function MaxTestTime() {}
function BottomMedTestTime() {}
function TopMedTestTime() {}
function MedianTestTime(){}


//general
function collect_data(stats){
	waitTimes = [];
	Ratios = [];
	testTimes = [];
	for(var x  = 0; x < stats.length; x ++){
		testTimes.push(stats[x].test_end - stats[x].test_start)
		for(var y = 0; y < stats[x].test_data.length; y ++) {
			Ratios.push(stats[x].test_data[y].ratio)
			waitTimes.push(stats[x].test_data[y].endWaitTime - stats[x].test_data[y].startWaitTime)
		}
	}
	//sort ascending
	waitTimes.sort(function(a, b){return a-b});
	testTimes.sort(function(a, b){return a-b});
	Ratios.sort(function(a, b){return a-b});

	var stats = {
		waitTimes: calculate_stats(waitTimes),
		testTimes: calculate_stats(testTimes),
		Ratios: calculate_stats(Ratios)
	}
	//get test name:
	var billers = $("#sequentialBillers").val();
	var proxies = $("#proxies").val();
	var proxy_assign =$("#proxy-assignment :selected").text();
	var q_algorithm = $("#q-algorithm :selected").text();
	var proxy_assign_alg = $("#algorithm :selected").text();
	var test_config = "Number of Billers: " + billers + " |Number of Proxies: " + proxies + " |Proxy Assignment: " + proxy_assign + " |Queue Algorithm: " + q_algorithm + " |Proxy Assignment Algorith: " + proxy_assign_alg
	stats.testConfig = test_config;
	//blob = new Blob([JSON.stringify(stats) + "," ], {type: "text/plain;charset=utf-8"});
	//saveAs(blob, "DATA: " + test_config  +".txt");
	console.log(stats);
	return stats;
}


function calculate_stats(data) {
	var max = data[data.length - 1];
	var min = data[0];
	var median_data = get_median(data);
	var median = median_data.median;
	if(median_data.odd) {
		//odd
		q1 = get_median(data.slice(0,median_data.pos)).median
		q3 = get_median(data.slice(median_data.pos + 1)).median
	} else {
		q1 = get_median(data.slice(0,data.length / 2)).median
		q3 = get_median(data.slice(data.length / 2)).median
	}
	var sum = 0;
	for(var x = 0; x < data.length; x ++){
		sum += data[x];
	}


	return {
		min: min,
		max: max,
		median: median,
		q1:q1,
		q3:q3,
		average: sum/data.length
	}

}

function get_median(data) {
	var median = null;
	var pos = null;
	var odd = data.length % 2 === 1
	//odd
	if (odd) {
		pos = Math.ceil(data.length / 2) -1
		median = data[pos]
	} else {
	//even
		pos = data.length / 2;
		median = (data[pos] + data[pos-1])/2
	}
	return {
		median: median,
		pos: pos,
		odd: odd
	}

}
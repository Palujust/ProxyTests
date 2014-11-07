
var proxy_array = [];
var waiting_queue =[];
var testStats= [];
$(document).ready(function(){
	// for(x = 0; x < 7; x++) {
	// 	proxy_array.push(new Proxy("Address" + x, "ID NUMBER" + x))
	// 	$("body").append("<div class='proxy_box' id='div_" + x + "'>Proxy " + x + "</div>");
	// }
	// setInterval(function() {

	// 	for(x = 0 ; x < proxy_array.length; x ++) {
	// 		var span_string = "Proxy " + x + "\n";
			
	// 		for(y = 0; y < proxy_array[x].running.length; y ++) {
	// 			span_string += proxy_array[x].running[y].biller + "-" + proxy_array[x].running[y].id + ", "
	// 		}
	// 		$("#div_" + x).text(span_string);
	// 	}
	// }, 1000)


	$("#button").click(function() {
		var billers = $("#sequentialBillers").val();
		var proxies = $("#proxies").val();
		var proxy_assign = $("#proxy-assignment").val();
		var q_algorithm = $("#q-algorithm").val();
		var proxy_assign_alg = $("#algorithm").val();

		var paramaters = {
			billers: billers,
			proxies: proxies,
			proxy_assign: proxy_assign,
			q_algorithm: q_algorithm,
			proxy_assign_alg: proxy_assign_alg
		}
		startTests(paramaters)
	})
})

function startTests(paramaters) {
	//intialize
	testStats = [];

	for(var x = 0; x < paramaters.proxies; x++) {
		//create the proxies
	}

	async.forEachSeries(minitests, function(test, callback) {
		console.log(test.id)
		return callback()
	}, function() {
		console.log("Done all tests")
	})



}



var proxy_array = [];
var waiting_queue =[];
var testStats= [];
var currently_running = [];
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
	//test change
	
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
	$("#button").prop( "disabled", true );
	$("body").append("<div id='test_num'></div>");
	testStats = [];
	var proxies = [];
	$(".proxy_box").remove();
	for(var x = 0; x < paramaters.proxies; x++) {
		proxies = proxies.concat({
			Running: [],
			queued: []
		})
		if (x == 0) {
			$("body").append("<div class='proxy_box' id='div_" + x + "'><strong>Proxy " + x + " (Server)</strong><p></p></div>");
		} else {
			$("body").append("<div class='proxy_box' id='div_" + x + "'><strong>Proxy " + x + "</strong><p></p></div>");
		}
	}
	//replace minitests with testgroup
	async.forEachSeries(minitests, function(test, callback) {
		console.log("Running test " + (test.id + 1) + " of " + minitests.length)
		$("#test_num").text("Running test " + (test.id + 1) + " of " + minitests.length)
		console.log("--------------------------------------")
		var job_count = 0;
		var test_start = new Date().getTime();
		var robot_time_data = [];
		//This adds a new task to the waiting queue 
		var new_robot_adder = setInterval(function() {
			if (test.tasks[job_count]) {
				console.log("Adding " + test.tasks[job_count].biller + " id" + job_count + " to waiting queue")
				test.tasks[job_count].startWaitTime = new Date().getTime();
				test.tasks[job_count].id = job_count;
				test.tasks[job_count].force_sequential = false;//test.tasks[job_count].biller_number <= paramaters.billers ;
				waiting_queue.push(test.tasks[job_count]);
				job_count ++;
				if (job_count > test.length) clearInterval(new_robot_adder)	
			}

		}, 100)
		var robot_runner = setInterval(function() {
			//update proxies list
			for(var x = 0; x < paramaters.proxies; x++) {
				$("#div_" + x + " p").text(JSON.stringify(proxies[x].Running))
			}



			//Nothing running, nothing waiting, nothing needs to be queued End the test.
			if (currently_running.length === 0  && waiting_queue.length === 0 && test.tasks.length <= job_count){
				testStats.push({
					test_id: test.id,
					test_start: test_start,
					test_end: new Date().getTime(),
					test_data: robot_time_data
				})
				clearInterval(robot_runner);
				return callback();
			} 
			if (currently_running.length < 2) {
				//Implement the queuing logic.
				if (waiting_queue.length > 0) {
					if (waiting_queue[0].force_sequential == false) {
						var robot = waiting_queue.shift();	
						robot.endWaitTime = new Date().getTime();
						currently_running.push(robot);
						console.log("Running " + robot.biller + " id" + robot.id)
						robot.proxy = 0;
						proxies[0].Running.push({
							biller: robot.biller,
							id: robot.id
						})
						setTimeout(function() {
							//remove from currently running
							for(var i = 0; i < currently_running.length; i ++){
								if (currently_running[i].id === robot.id){
									 currently_running.splice(i, 1);
									 break;
								}
							}
							//remove from proxy's queue
							for(var i = 0; i < proxies[robot.proxy].Running.length; i ++) {
								if (proxies[robot.proxy].Running[i].id === robot.id){
									proxies[robot.proxy].Running.splice(i, 1);
									break;
								}								
							}
							console.log("Robot " + robot.biller + " id" + robot.id + " finished")
							robot_time_data.push({
								startWaitTime: robot.startWaitTime,
								endWaitTime: robot.endWaitTime,
								waiting: robot.endWaitTime - robot.startWaitTime,
								duration: robot.duration,
								ratio: (robot.endWaitTime - robot.startWaitTime)/ robot.duration,
							})
						}, robot.duration)
						currently_running.push()					
									
					} else {

					}
				}



			}
		}, 10)
	}, function() {
		console.log("Done all tests")
		$("#button").prop( "disabled", false );
	})




}


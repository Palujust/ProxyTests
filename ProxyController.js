
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
	//replace minitests with testgroup
	async.forEachSeries(minitests, function(test, callback) {
		console.log("Running test " + (test.id + 1) + " of " + minitests.length)
		var job_count = 0;
		var test_start = new Date().getTime();
		var robot_time_data = [];
		//This adds a new task to the waiting queue 
		var new_robot_adder = setInterval(function() {
			if (test.tasks[job_count]) {
				console.log("Adding " + test.tasks[job_count].biller + " id" + job_count + " to waiting queue")
				test.tasks[job_count].startWaitTime = new Date().getTime();
				test.tasks[job_count].id = job_count;
				waiting_queue.push(test.tasks[job_count]);
				job_count ++;
				if (job_count > test.length) clearInterval(new_robot_adder)	
			}

		}, 100)
		var robot_runner = setInterval(function() {
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
				var robot = waiting_queue.shift();
				if (robot) {
					robot.endWaitTime = new Date().getTime();
					currently_running.push(robot);
					console.log("Running " + robot.biller + " id" + robot.id)
					setTimeout(function() {
						
						for(var i = 0; i < currently_running.length; i ++){
							if (currently_running[i].id === robot.id){
								 currently_running.splice(i, 1);
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
				}

			}
		}, 10)
	}, function() {
		console.log("Done all tests")
	})




}


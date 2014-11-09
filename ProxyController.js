
//Need to specify in code: 
//- max conncurrent running robots 
//- which test pattern to use
//both are in the startTests method near the top
var proxy_array = [];
var waiting_queue =[];
var testStats= [];
var currently_running = [];

var test_array =[t100by100, t5by5, t2by100, customtest];
$(document).ready(function(){
	
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
	var test_sequence = test_array[3];
	var max_concurrent_tasks = 2;
	$(".proxy_box").remove();
	for(var x = 0; x < paramaters.proxies; x++) {
		proxies = proxies.concat({
			Running: [],
			queued: {}
		})
		if (x == 0) {
			$("body").append("<div class='proxy_box' id='div_" + x + "'><strong>Proxy " + x + " (Server)</strong><p></p></div>");
		} else {
			$("body").append("<div class='proxy_box' id='div_" + x + "'><strong>Proxy " + x + "</strong><p></p></div>");
		}
	}
	
	async.forEachSeries(test_sequence, function(test, callback) {
		console.log("Running test " + (test.id + 1) + " of " + test_sequence.length)
		$("#test_num").text("Running test " + (test.id + 1) + " of " + test_sequence.length)
		console.log("--------------------------------------")
		var job_count = 0;
		var test_start = new Date().getTime();
		var robot_time_data = [];
		var billers_job_count = {};  //used for round robin proxy assignment
		//This adds a new task to the waiting queue 
		var new_robot_adder = setInterval(function() {
			if (test.tasks[job_count]) {
				console.log("Adding " + test.tasks[job_count].biller + " id" + job_count + " to waiting queue")
				test.tasks[job_count].startWaitTime = new Date().getTime();
				test.tasks[job_count].id = job_count;
				test.tasks[job_count].force_sequential = test.tasks[job_count].biller_number <= paramaters.billers ;
				//if we are forcing sequential and the proxy assignment is static, then we need to assign a proxy
				if (test.tasks[job_count].force_sequential){
					if (paramaters.proxy_assign == 1){
						//Round robin
						console.log(JSON.stringify(billers_job_count))
						if (paramaters.proxy_assign_alg ==1){
							if (!billers_job_count[test.tasks[job_count].biller]) billers_job_count[test.tasks[job_count].biller] = 0;

							test.tasks[job_count].proxy = billers_job_count[test.tasks[job_count].biller] % paramaters.proxies;
							billers_job_count[test.tasks[job_count].biller]++;
							console.log(test.tasks[job_count].biller + " id" + job_count + " proxy: " + test.tasks[job_count].proxy)
						} else {
							//Shortest Queue Code
							var min = null;
							var position = null;
							var added_flag = false;
							for(var x = 0; x < proxies.length; x ++) {
								if (!proxies[x].queued[test.tasks[job_count].biller]){
									proxies[x].queued[test.tasks[job_count].biller] = 1;
									test.tasks[job_count].proxy = x;
									added_flag = true;
									break;
								}
								if (min == null){
									position = 0;
									min = proxies[x].queued[test.tasks[job_count].biller];
								}
								if (proxies[x].queued[test.tasks[job_count].biller] < min) {
									position = x;
									min = proxies[x].queued[test.tasks[job_count].biller];
								}

							}
							if (!added_flag) {
								proxies[position].queued[test.tasks[job_count].biller] ++;
								test.tasks[job_count].proxy = position;
							}
						} 

					}
				}
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
				//return callback();
			}
			//TODO change 2 to 10 
			if (currently_running.length < max_concurrent_tasks) {
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
							//remove from proxy's running list
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
						if (paramaters.proxy_assign == 1){
							//Use assigned proxy
						} else {
							//try to find an available proxy
						}
						//check if current robot can be run
						//if so, run it

						//else do this:
						if (paramaters.q_algorithm == 1) {
							//send to back
						} else {
							//pick the next robot
						}
					}
				}



			}
		}, 10)
	}, function() {
		console.log("Done all tests")
		$("#test_num").text("Done all tests")
		console.log("--------------------------------------")
		$("#button").prop( "disabled", false );
	})




}


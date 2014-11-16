"use strict"
//Need to specify in code: 
//- max conncurrent running robots 
//- which test pattern to use
//both are in the startTests method near the top
var proxies = [];
var waiting_queue =[];
var testStats= [];
var currently_running = [];
var robot_time_data;
var test_array =[t10by100, t100by100, t5by5, t2by100, customtest, test_grid]; //These are various generated test patterns stored in other JS files
var global_test_data_string = "Sequential Billers,Proxies, Proxy Assignment,Blocked Algorithm,Proxy Algorithm,T_Max,T_Q3,T_Median,T_Q1,T_Min,T_Average,W_Max,W_Q3,W_Median,W_Q1,W_Min,W_Average,R_Max,R_Q3,R_Median,R_Q1,R_Min,R_Average";
var config_count = "0";
var num_configs;
$(document).ready(function(){
	
	$("#button").click(function() {
		var billers = $("#sequentialBillers").val();
		var proxies = $("#proxies").val();
		var proxy_assign = $("#proxy-assignment").val();
		var q_algorithm = $("#q-algorithm").val();
		var proxy_assign_alg = $("#algorithm").val();

		var parameters = {
			billers: billers,
			proxies: proxies,
			proxy_assign: proxy_assign,
			q_algorithm: q_algorithm,
			proxy_assign_alg: proxy_assign_alg
		}
		startTests(parameters, function() {alert("hello")})
	})
	$("#button2").click(function() {
		var test_configs = [];
		for (var b = 1; b < 6; b++){
			for(var p = 1; p< 6; p ++){
				for(var p_a = 1; p_a < 3; p_a++){
					for (var q = 1; q < 3; q ++){
						if (p_a == 1){
							for (var p_a_a = 1; p_a_a < 3; p_a_a ++){
								test_configs.push({
									billers: b,
									proxies: p,
									proxy_assign: p_a,
									q_algorithm: q,
									proxy_assign_alg: p_a_a
								})
							}
						} else {
							test_configs.push({
									billers: b,
									proxies: p,
									proxy_assign: p_a,
									q_algorithm: q,
									proxy_assign_alg: 1
							})
						}
					}
				}
			}
		}
		num_configs = test_configs.length;
		async.forEachSeries(test_configs, function(config, callback){
			config_count++;
			startTests(config, callback)
		}, function() {
			console.log("Done ALL TESTS")
			var blob = new Blob([global_test_data_string], {type: "text/plain;charset=utf-8"});
			saveAs(blob, "test_data.csv");
		})

		
	})
})
function clearEverything() {
	var proxies = [];
	var waiting_queue =[];
	var testStats= [];
	var currently_running = [];
	var robot_time_data = [];
}
function startTests(parameters, cb) {
	//intialize
	$("#button").prop( "disabled", true );
	$("#button2").prop( "disabled", true );
	$("body").append("<div id='test_num'></div>");
	testStats = [];
	proxies = [];
	var test_sequence = test_array[0];
	var max_concurrent_tasks = 10;
	$(".proxy_box").remove();
	for(var x = 0; x < parameters.proxies; x++) {
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
		$("#test_num").text("Running test " + (test.id + 1) + " of " + test_sequence.length + " for config " + config_count + " /" + num_configs)
		console.log("--------------------------------------")
		var job_count = 0;
		var test_start = new Date().getTime();
		robot_time_data = [];
		var billers_job_count = {};  //used for round robin proxy assignment
		//This adds a new task to the waiting queue 
		var new_robot_adder = setInterval(function() {
			if (test.tasks[job_count]) {
				console.log("Adding " + test.tasks[job_count].biller + " id" + job_count + " to waiting queue")
				test.tasks[job_count].startWaitTime = new Date().getTime();
				test.tasks[job_count].id = job_count;
				test.tasks[job_count].force_sequential = test.tasks[job_count].biller_number <= parameters.billers ;
				//if we are forcing sequential and the proxy assignment is static, then we need to assign a proxy
				if (test.tasks[job_count].force_sequential){
					if (parameters.proxy_assign == 1){
						//Round robin
						console.log(JSON.stringify(billers_job_count))
						if (parameters.proxy_assign_alg ==1){
							if (!billers_job_count[test.tasks[job_count].biller]) billers_job_count[test.tasks[job_count].biller] = 0;

							test.tasks[job_count].proxy = billers_job_count[test.tasks[job_count].biller] % parameters.proxies;
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

		}, 10)
		var robot_runner = setInterval(function() {
			//update proxies list
			for(var x = 0; x < parameters.proxies; x++) {
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
			if (currently_running.length < max_concurrent_tasks) {
				//Implement the queuing logic.
				if (waiting_queue.length > 0) {
					if (waiting_queue[0].force_sequential == false) {
						runRobot(0);				
									
					} else {	
						//check if we can run the current robot
						var data = canWeRunThisTask(waiting_queue[0], parameters.proxy_assign);
						//if so, run it
						if (data.can_run){
							
							//Decrement number of waiting tasks on the proxy that was selected if we are using static allocation and the assignment algorithm is shortest queue
							if (parameters.proxy_assign_alg == 2 && parameters.proxy_assign == 1) {
								proxies[data.open_proxy].queued[waiting_queue[0].biller] --;
							}
							runRobot(data.open_proxy);
						} else {
							//else do this:
							if (parameters.q_algorithm == 1) {
								//send to back
								waiting_queue.push(waiting_queue.shift());
							} else {
								//find the next available robot and run it
								for(var k = 0; k < waiting_queue.length; k++) {
									var task = canWeRunThisTask(waiting_queue[k], parameters.proxy_assign)
									//move the element to the front so that we can process it
									if (task.can_run){
										var element = waiting_queue.splice(k, 1)[0];
										waiting_queue.unshift(element)
										
										//Decrement number of waiting tasks on the proxy that was selected if we are using static allocation and the assignment algorithm is shortest queue
										if (parameters.proxy_assign_alg == 2 && parameters.proxy_assign == 1) {
											proxies[task.open_proxy].queued[waiting_queue[0].biller] --;
										}
										runRobot(task.open_proxy);
										break;
									}
								}
							}							
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
		var stats = collect_data(testStats);

		var prox_Assign;
		var blocked_Alg;	
		var prox_Assign_alg;
		if (parameters.proxy_assign ==1){
			prox_Assign = "Static"
			if (parameters.proxy_assign_alg ==1){
				prox_Assign_alg = "Round Robin"
			} else {
				prox_Assign_alg = "Shortest Queue"
			}
		} else{
			prox_Assign = "Dynamic"
			prox_Assign_alg = "-"
		}
		if (parameters.q_algorithm ==1){
			blocked_Alg = "Send to Back"
		} else{
			blocked_Alg = "Bring First Best Forward"
		}
		global_test_data_string += "\n" + parameters.billers + "," + parameters.proxies + "," + prox_Assign + "," + blocked_Alg + "," + prox_Assign_alg + "," + stats.testTimes.max + "," + stats.testTimes.q3 + "," + stats.testTimes.median +"," + stats.testTimes.q1 +"," + stats.testTimes.min + "," + stats.testTimes.average + "," + stats.waitTimes.max + "," + stats.waitTimes.q3 + "," + stats.waitTimes.median +"," + stats.waitTimes.q1 +"," + stats.waitTimes.min + "," + stats.waitTimes.average + "," + stats.Ratios.max + "," + stats.Ratios.q3 + "," + stats.Ratios.median +"," + stats.Ratios.q1 +"," + stats.Ratios.min + "," + stats.Ratios.average
		return cb();
	})




}

function runRobot(selected_proxy) {
	var robot = waiting_queue.shift();	
	robot.endWaitTime = new Date().getTime();
	currently_running.push(robot);
	console.log("Running " + robot.biller + " id" + robot.id)
	robot.proxy = selected_proxy;
	proxies[selected_proxy].Running.push({
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

}
function canWeRunThisTask(robot, proxy_assignment) {
	var can_run = true;
	var open_proxy;
	if (proxy_assignment == 1){
		//Use assigned proxy
		if (robot.force_sequential == false) {
			return {
				can_run:true,
				open_proxy: 0
			}
		}
		for(var i = 0; i < proxies[robot.proxy].Running.length; i ++) {
			if (proxies[robot.proxy].Running[i].biller == robot.biller) {
				can_run = false;
				break;
			}
		}
		open_proxy = robot.proxy;
	} else {
		can_run = false;
		//try to find an available proxy
		for(var i = 0; i < proxies.length; i++) {
			var good_proxy = true;
			for(var j = 0; j < proxies[i].Running.length; j ++) {
				if (proxies[i].Running[j].biller ==robot.biller) {
					good_proxy = false;
					break;
				}
			}
			if (good_proxy) {
				open_proxy = i;
				can_run = true;
				break;
			}
		}
		
	}
	return {
		can_run: can_run,
		open_proxy: open_proxy
	}
}
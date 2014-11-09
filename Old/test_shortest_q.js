proxies = [];
var test = test_array[3][0];
function add_task(job_count) {
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

	console.clear();
	for(y = 0; y < proxies.length; y ++){
		console.log("-------------------")
		console.log("Proxy " + y)
		console.log(JSON.stringify(proxies[y].queued))
	}
	console.log("Proxy selected: " + test.tasks[job_count].proxy)
}
function create_proxies(num_proxies) {
	for(var x = 0; x < num_proxies; x++) {
		proxies = proxies.concat({
			Running: [],
			queued: {}
		})

	}
}
var tests = [];

function generateTest(number_of_tests, number_of_tasks_per_test) {
	//To generate a random number in a range Math.floor(Math.random()*(max-min+1)+min);
	var billers = ["Biller A", "Biller B", "Biller C", "Biller D", "Biller E"]
	tests = [];
	//var blob = new Blob(["var test_grid = ["], {type: "text/plain;charset=utf-8"});
	//saveAs(blob, "a.txt");
	for(var test = 0; test< number_of_tests; test ++) {
		var new_test = {};
		new_test.id = test;
		new_test.tasks = [];
		for(var task = 0; task < number_of_tasks_per_test; task ++) {
			var billernumber = Math.floor(Math.random()*(5-1+1)+1);
			var new_task = {
				duration: Math.floor(Math.random()*(10000-500+1)+500),
				biller_number: billernumber,
				biller: billers[billernumber -1],
			}
			new_test.tasks.push(new_task)
		}
		// var blob
		// if (test < number_of_tests -1) {
		// 	blob = new Blob([JSON.stringify(new_test) + "," ], {type: "text/plain;charset=utf-8"});	
		// } else {
		// 	blob = new Blob([JSON.stringify(new_test) + "]" ], {type: "text/plain;charset=utf-8"});
		// }
		
		//saveAs(blob, "body" + test  +".txt");
		tests.push(new_test)
	}
}
var tests = [];

function generateTest(number_of_tests, number_of_tasks_per_test) {
	//To generate a random number in a range Math.floor(Math.random()*(max-min+1)+min);
	var billers = ["Biller A", "Biller B", "Biller C", "Biller D", "Biller E"]
	tests = [];
	for(var test = 0; test< number_of_tests; test ++) {
		var new_test = {};
		new_test.id = test;
		new_test.tasks = [];
		for(var task = 0; task < number_of_tasks_per_test; task ++) {
			var billernumber = Math.floor(Math.random()*(5-1+1)+1);
			var new_task = {
				duration: Math.floor(Math.random()*(10000-1000+1)+1000),
				biller_number: billernumber,
				biller: billers[billernumber -1],
			}
			new_test.tasks.push(new_task)
		}
		tests.push(new_test)
	}
}
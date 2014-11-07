function Proxy(address, custom_id){

   this.address = address;
   this.running = [];
   this.queue =[];
   if (custom_id) this.custom_id = custom_id;
}

Proxy.prototype.add_robot = function(id, biller, duration) {
	var self = this;
	var new_robot = {
		id: id,
		biller: biller,
		duration: duration
	}
	this.running.push(new_robot);
	setTimeout(function() {
		self.robot_end(id, biller)
	}, duration);
}

Proxy.prototype.get_id = function() {
	if (this.custom_id) return this.custom_id;
	return ("No ID Number");
}

Proxy.prototype.robot_end = function(id, biller) {
	console.log("Biller: " + biller);
	console.log("ID" + id);
	var new_array = [];
	for(x = 0; x < this.running.length; x++) {
		if (this.running[x].id !== id) {
			new_array.push(this.running[x]);
		}
	}
	this.running = new_array;

	this.add_from_queue();
}

Proxy.prototype.add_to_queue = function (id, biller, duration) {
	this.queue.push({
		id: id,
		biller: biller,
		duration: duration
	})
}
Proxy.prototype.add_from_queue = function(){

	for(x = 0; x < this.queue.length; x ++) {
		var robot = this.queue[x]
		var runable = true;
		for(y = 0; y < this.running.length; y ++) {
			if (robot.biller === this.running[y].biller) runable = false
		}
		if (runable) {
			this.queue.splice(x, 1)
			this.add_robot(robot.id, robot.biller, robot.duration)
		}
	}
}
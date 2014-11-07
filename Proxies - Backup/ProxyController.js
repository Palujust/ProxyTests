
var proxy_array = [];
var id_count = 0;

$(document).ready(function(){
	for(x = 0; x < 7; x++) {
		proxy_array.push(new Proxy("Address" + x, "ID NUMBER" + x))
		$("body").append("<div class='proxy_box' id='div_" + x + "'>Proxy " + x + "</div>");
	}
	setInterval(function() {

		for(x = 0 ; x < proxy_array.length; x ++) {
			var span_string = "Proxy " + x + "\n";
			
			for(y = 0; y < proxy_array[x].running.length; y ++) {
				span_string += proxy_array[x].running[y].biller + "-" + proxy_array[x].running[y].id + ", "
			}
			$("#div_" + x).text(span_string);
		}
	}, 1000)


	$("#button").click(function() {
		var biller = $("#biller").val();
		id_count ++;
		var duration = Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000;
		for(i = 0; i < proxy_array.length; i ++) {	
			var usuable = true;
			for(j = 0; j < proxy_array[i].running.length; j ++) {
				if (proxy_array[i].running[j].biller === biller) {
					usuable = false;
					break;
				}
			}
			if (usuable) {
				proxy_array[i].add_robot(id_count, biller, duration)
				return
			}
		}
		
		var min = 0;
		var amount = proxy_array[0].queue.length;

		for(x = 1; x < proxy_array.length; x ++) {
			if (proxy_array[x].queue.length < amount) {
				amount = proxy_array[x].queue.length;
				min = x;
			}
		}
		proxy_array[min].add_to_queue(id_count, biller, duration)
		console.log("Added to queue: " + min)
	})
})


// timers are likely the easiest and will start there.
timeCount = 0;

var timer = setInterval(function() {timeCount++; console.log(timeCount)}, 1000);

$(document).on('ready', function() {
	$(".metricsBtn").on('click', function(){
		clearTimeout(timer);
	})
});
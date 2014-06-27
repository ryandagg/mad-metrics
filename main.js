// timers are likely the easiest and will start there.
/* Goals:
**DONE** Time before clicking Sign Up
**DONE** Time spent on page
What percentage of the page was viewed
Total distance scrolled
Time spent on each section of the page
	How to do?
	-break the page into text-line sized segments and 
	-determine what portion of the page is in the browser every second
	-calculate how long something was viewed by how much that section fit within the range of the window
Heat map of viewing activity
*/

var timeCount = 0;
var countToSignUp;
var signedUp = false;
var intervalID;
var scrollRangelist = [];
var windowHeight = $(window).height();
console.log(windowHeight)
// var scrollBottomList = [];

var timer = function(command) {
	if(command === 'start') {
		intervalID = setInterval(function() {timeCount++;/* console.log(timeCount)*/}, 1000);
	}
	else {
		clearInterval(intervalID);
	}
}

timer("start");

$(document).on('ready', function() {
	$(document).on('scroll', function(){
		scrollRangelist.push([$('body').scrollTop(), $('body').scrollTop() + windowHeight]);
		
	})

	$(".metricsBtn").on('click', function(){
		timer("stop");

		if (!signedUp) {
			countToSignUp = timeCount
			signedUp = true;
		}
		$(".popup").show();
		$(".timeTotalDisplay").text(timeCount + " seconds")
		$(".signTimeDisplay").text(countToSignUp + " seconds")
	})		
	
	$(".closeButton").click(function(){
		$(".popup").hide();
		timer("start");
 	})
	
});

// timers are likely the easiest and will start there.
/* Goals:
**DONE** Time before clicking Sign Up
**DONE** Time spent on page
**DONE** What percentage of the page was viewed
**DONE** Total distance scrolled
Time spent on each section of the page
	How to do?
	-break the page into text-line sized segments and 
	-determine what portion of the page is in the browser every second
	-calculate how long something was viewed by how much that section fit within the range of the window
Heat map of viewing activity
*/

// event handlers
$(document).on('ready', function() {
	// initialize onready necessary variables
	var timeCount = 0;
	var countToSignUp;
	var signedUp = false;
	var intervalID;
	var scrollRangeList = [];
	var windowHeight = $(window).height();
	var heatmapSectionTotal = 10;
	
	setTimeout(function(){
		window.bodyHeight = $("body").height();
		
	}, 500);

	// function to search through all scroll bottom values and determine how low they have scrolled
	var percentWindowScrolled = function() {
		var lowest = 0;
		for (var i = 0; i < scrollRangeList.length; i++) {
			if (scrollRangeList[i][1] > lowest) {
				console.log("iteration: ", scrollRangeList[i][1], " | ", "lowest: ", lowest)
				lowest = scrollRangeList[i][1];
			}
		}
		console.log("lowest: ", lowest)
		return String(Math.round(lowest / bodyHeight * 100)) + "%";
	}

	// function to determine total distance scrolled
	var distanceScrolled = function() {
		var distance = 0;
		for (var i = 1; i < scrollRangeList.length; i++) {
			distance += Math.abs(scrollRangeList[i][0] - scrollRangeList[i - 1][0]);
		};
		return distance;
	}

	// // time per section, called in timer function
	// var heatmapSectionCounter = function() {
	// 	for (var i = 0, i < heatmapSectionTotal; i++) {
	// 		if()
	// 	}
	// }

	// timer used throughout doc
	var timer = function(command) {
		if(command === 'start') {
			intervalID = setInterval(function() {timeCount++;/* console.log(timeCount)*/}, 1000);
		}
		else {
			clearInterval(intervalID);
		}
	}

	timer("start");

	// scroll functionality
	$(document).on('scroll', function(){
		scrollRangeList.push([$('body').scrollTop(), $('body').scrollTop() + windowHeight]);
		
	});

	// metrics button functionality
	$(".metricsBtn").on('click', function(){
		timer("stop");
		$(".heatmap").empty();

		if (!signedUp) {
			countToSignUp = timeCount
			signedUp = true;
		}

		$(".popup").show();

		// Fill the metrics on popup
		$(".timeTotalDisplay").text(timeCount + " seconds");
		$(".signTimeDisplay").text(countToSignUp + " seconds");
		$(".percentViewedDisplay").text(percentWindowScrolled());
		$(".totalDistanceDisplay").text(distanceScrolled() + "px");
		// 
	})		
	
	$(".closeButton").click(function(){
		$(".popup").hide();
		timer("start");
 	})

	$(".heatButton").click(function(){
		$(".popup").hide();
		$(".heatmap").width("100%");
		for (i = 0; i < heatmapSectionTotal; i++) {
			$(".heatmap").append("<div class= 'heatSection" + String(i) + "'></div>");
			$(".heatSection" + String(i)).css("top", bodyHeight/heatmapSectionTotal*i );
		}

		$("div[class^='heatSection']").css({
			"height": bodyHeight/heatmapSectionTotal, 
			"position": "absolute",
			"display": "inline-block",
			"width": "100%",
			"background-color": "red"
		});
 	})
});

// ### START OF THE CODE FOR MATCH THE ANIMALS GAME ###//

// as you hover over the menu bar options the color changes

// drag and drop
$(function() {
	
	$("#wellDone").hide();
   // Makes the object draggable 
	$("#objects div").draggable({ 
		containment: '#container',
		revert: true 
	});
	// Makes the object droppable
	$("#slots div").droppable({ 
		tolerance: "intersect", 
		accept: '#objects div', 
		hoverClass: 'drop',
		drop: handle
	});
	
// Chages the color of the square as you hover over it
	$(".object").hover(
		function(){
			$(this).toggleClass("altobject");
		},
		function(){
			$(this).toggleClass("altobject");
		}
	);
});

// Checks if the object is dropped into the correct slot and 
// keeps score 	
var score = 0;

var handle = (function(event, ui){
	
	var object = $(ui.draggable).attr("id");
	var slot = $(this).attr("id"); 
	
	if(object + "_slot" == slot){
		score++;
		$("div .score").text("Score: " + score);
		if(score == 3) {
			$("#wellDone").fadeIn(1000);
		}
		draggable("option", "revert", false);
		ui.draggable("option", "snapMode", "inner");
	}
	else
	{	// if the oject does not match the slot then the object
		// will revert back to its original place
		revert: true
	}
});

// MAY BE ABLE TO BUILD AJAX INTO THIS

var restart = (function(){
	$("#restart").on("click", "revert", true);
});

	restart();
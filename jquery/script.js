// ### START OF THE CODE FOR THE JIGSAW PUZZLE ###//

$(function(){

	// $(function(){
	// 		$("ul li a").hover(
	// 			function(){
	// 				$(this).css("background-color", "red");
	// 			},
	// 			function(){
	// 				$(this).css("background-color", "purple");
	// 			}
	// 		);
	// 	});
	
	$('#timeout').hide();
	$("#wellDone").hide();
	
	var pieces = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	 
    // Sort the pieces array randomly
	pieces.sort( function() { 
	return Math.random() - .5 } 
	);
		
	for ( var i=0; i < 12; i++ ) {
		
	    $('<div class="jigsaw">' + pieces[i] + '</div>')
	 	// .data method allows us to attach 
	 	//	data of any type to DOM elements
	 	// number is an array container that will store all the 
	 	//	numbers that data appends to it. {similar to array_push(val, val)}
			.data( 'piece', pieces[i] )
		// method gets the attribute 
		//	value for ONLY the first element in the matched set
		//	.attr is creating the id="piece1,2,3 etc" for the
		// <div>piece[i]</div>
			.attr( 'id', 'piece' + pieces[i] )
		//	appends the new divs created to the parent <div id="puzzle"
			.appendTo( '#puzzle' )
			
			document.getElementsByClassName('jigsaw')[i]
				.innerHTML = '<img src="images/jigsaw/jigsaw_' 
					 + pieces[i] + '.jpg" order="' + pieces[i] + '"/>';
		
		$("#puzzle").sortable({
				cursor: 'pointer',
				distance: 2,
				containment: '#container',
				tolerance: "intersect",
				update: function(){
					if(isOrdered()){
						$('#wellDone').fadeIn(500);
						console.log('yes');
					}
					else {
						console.log('No');
					}
				}
		});
	}
	
	// if all the values in the pieces array are rearranged in descending order
	// then the jigsaw is complete and the user should get a message to
	// say they have put the jigsaw together.   
});

// This function allows the user to re scramble the jigsaw and start again.
	
var resetGame = (function(e){
	
	$('#puzzle').show();
	$('#timeout').hide();
	$("#countdown").show();
	
	$("#wellDone").hide();
	
	
	// To output different jigsaws for the user when they click reset the code 
	// needs to loop through an array of jigsaws
	
	 var pieces = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

	 		pieces.sort( function() { return Math.random() - .5 } );	
			
	// pieces is sorted randomly and by using the function above
					
		for( var i = 0; i < pieces.length; i++ ){
			var piece = '<div class="jigsaw"></div>';
			
		 document.getElementsByClassName('jigsaw')[i].innerHTML = '<img src="images/jigsaw/jigsaw_' 
					 + pieces[i] + '.jpg" order="' + pieces[i] + '"/>'; 						
		}
		
	// the loop works by replacing the full array of pieces 
	// but it only outputs the same piece 12 times.
	
});

var isOrdered = function() {
	var ordered = true;
	$('.jigsaw').each(function(i){
		if($(this).find("img").attr('order') != i + 1) {
			ordered = false;
		}
	});
	
	return ordered;
};
	
// ### END OF THE JIGSAW PUZZLE ###//


//----------------------------------------------//

var countDown = function(){
	
	 $('#timeout').hide();
	
	 var max_countdown = 25;
    var countdown = max_countdown;
    var display_countdown = (function () {
        $("#countdown").text("Timer: " + countdown);
    });

    var countdown_interval = setInterval( function() {
        display_countdown();
		  countdown--;
        if(countdown < 0) {

            // display_error();
				 $("#countdown").hide();
				 $('#puzzle').fadeOut(500);
				 $('#timeout').fadeIn(500);
				
				countdown = NaN;
				
        }
        }, 1000);
};

// ### END OF THE TIMER FUNCTION ###//

//----------------------------------------------//

// ### START OF THE CODE FOR THE QUIZ ###//

// JSON ARRAY
 
var questions = [
    { "text": "2 + 2 is _ ?", "answers": ["4","8","7","10"], "correct": "4" },
    { "text": "The car has _ wheels ?", "answers": ["2","4","6","8"], "correct": "4" },
    { "text": "Santy's hat is ___ ?", "answers": ["Red", "Blue", "Green", "Yellow"], "correct": "Red" },
    { "text": "Which 3 letters spell Cat ?", "answers": ["DGO", "TAM", "TAC", "TAS"], "correct": "TAC" },
    { "text": "A dog says ____?", "answers": ["Woof", "Moo", "Meow", "Baa"], "correct": "Woof" },
    { "text": "A fish lives in the ___?", "answers": ["House", "Barn", "River", "Tree"], "correct": "River" }
];

    var score = 0;
    var display_question = (function () {
        var question = questions[score];

        $("#question").text(question.text);

        $("#answers").empty();
        for (var i in question.answers) {
            var answer = question.answers[i];
            $("#answers").append("<li>" + answer + "</li>");
        }

        $("#answers li").on("click", validate_answer);      
    });

    var validate_answer = (function () {
        if ($(this).text().toLowerCase() == questions[score].correct.toLowerCase() ) {
            score++;
            if (questions.length > score) {
                display_question();
                countdown = max_countdown;
            } else {
                $("#question").html("Well Done!!<br/> You got them all correct");
                $("#answers").empty();
                clearInterval(countdown_interval);
            }
        } else {
            display_error();
        }

        display_score();
    });

    var display_error = (function () {
        $("#question").text("Aw .. Click here to Try again!");
        $("#answers").empty();
        clearInterval(countdown_interval);
    });

    var display_score = (function () {
        $("#score").html("<h4>Your score is: " + score + "</h4>");
    });

    var max_countdown = 15;
    var countdown = max_countdown;
    var display_countdown = (function () {
        $("#quiz_timer").text(countdown);
    });


    var countdown_interval = setInterval(function() {
        display_countdown();
        countdown--;
        if(countdown < 0) {
            display_error();
        }
        }, 1000);
 
    display_question(); 
    display_score();

// ### END OF THE QUIZ ###//

//----------------------------------------------//

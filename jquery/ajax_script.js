$(function(){
		
		$('#scores').hide();
		
		$('#new_record').hide();
		
   	$("form").on("submit", function(e){
			e.preventDefault();
			savePlayerDetails();
   	});

		$("button").on("click", function(){
			retrieveScores();
   	}); 
		
});
	
function savePlayerDetails(){
	
	$.post("create_XML.php", { 
				first_name: $("#first_name").val(), 
				last_name: $("#last_name").val(), 
				age: $("#age").val() 
			}).done(function(msg){		
			 	$("#new_record").fadeIn(500);
				$("#new_record").html("Hello " + $("#first_name").val() + " you are " + $("#age").val());			
			});
};   

function retrieveScores(){
			
	$.get( "records.xml", function(data){
		// interprets and gives you the data retrieved from the xml.file
		console.log(data); 
		
		$(data).find('record player').each(function(){
			var players = $(this).children();
			console.log(players);
			$('#scores').fadeIn(500);
			
			for(var i = 0; i < players.length; i++){																					
					$("#scores ul").append('<li>' + players[i].firstChild.nodeValue + '</li>'); 
			} // for (var i)
		});
	}, "xml");
	
}; // end of retrieveScores();
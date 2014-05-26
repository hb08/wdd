 (function($){

 // Find the width of each scrollList and set 
 	var thisContainer = $(".scrollList");
 	var finding = $.each(thisContainer, containMe);
 		// With variables set, let's get functioning
 	function containMe(){
 			// A little larger than article width
	 	var elemWidth = 139;
	 		// Get ID for list each time
	 	var thisId = $(this).children('ul').attr('id'); 
	 		// Use the id to find how many children the list has
	 	var containMe =  $('#' + thisId).children().size();
	 		// Container size is the number of children times the width wanted for each
	 	var containSize = elemWidth * parseInt(containMe);
	 		// Make it so 
	 	$('#' + thisId).css('width', containSize);
	}	
	
  // Image Preload
  		// Set up the function
	$.preloadImages = function(){
			// Run through everything shoved into the function 
		for (var i = 0; i < arguments.length; i++){ 
			$("<img />").attr("src", arguments[i]); 
			} 
		} 
		// Send in all the images to preload - buttons and repeating images will cache for subsequent pages
	$.preloadImages("../img/buttons/coghover.png", "../img/buttons/cogvisited.png", "../img/buttons/filter.png", "../img/buttons/filterhover.png", "../img/buttons/share.png", "../img/buttons/starEmpty.png", "../img/buttons/starGold.png");	
	
  // Change Toggle Image
	$("#toggleResults").click(function(){
		var checkThis = $('#toggleResults').css('background-image');
		if(checkThis.contains('Lists')){
			$("#toggleResults").css('background-image', 'url("img/buttons/toggleBooks.png")');
		} else{
			$("#toggleResults").css('background-image', 'url("img/buttons/toggleLists.png")');
		}
	});

  // Show/Hide Text
  		// Hide content on load using JS so those without it can read everything
  	$('.readMoreText').addClass('hide');
  		// Don't hide the links if the text is hidden - you'll need those to access the info, but keep them hidden if they don't have JS, since they're useless to those users
  	$('.readMore , .readLess').removeClass('hide');
  		// When More is Clicked
  	$('.readMore').on('click', function(e){ 
  			// Hide the link, show the text
  		$(this).next('.readMoreText').removeClass('hide');
	  	$(this).addClass('hide');
	  		// Don't let the link do what it normally would
	  	e.preventDefault();
  	});
  		// When Less is clicked
  	$('.readLess').on('click', function(e){
  			// Hide the text, show the more link
  		$(this).parent().addClass('hide');
  		$(this).parent().siblings('.readMore').removeClass('hide');
  			// Don't let the link do what it normally would
  		e.preventDefault();
  	});

  // Shelve Effect
  		// Hide Shelve Wording until rollover
  	$('.shelve').hover(function(){
  		$(this).children('span').removeClass('invisible');
  		}, function(e){
  		$(this).children('span').addClass('invisible');
  		}
  	);

  // Change positioning dynamically on resize or on load with smaller width     
        function rightPosition(){
            if($(window).width() < 520){
                var rightSize =  $('#resultsReadout').height() + 32 + "px";
                rightSize = "-" + rightSize;
                $('#toggleContain').css("top", rightSize);
            } else { $('#toggleContain').css("top", "");}
        }
        $(window).resize(rightPosition);
        rightPosition;
        
        
  // Add Accessability by changing text for stars that are gold 
        $('.starGold').children('.screenRead').append(' Gold');
  	
  	
 })(jQuery);
 
  	// Force Input into Link until server info can be used to populate real pages
  	function forceSearch(){
  		window.location="search.html";
  	}

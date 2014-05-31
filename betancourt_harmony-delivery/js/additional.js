 (function($){

 // Find the width of each scrollList and set 
 	var thisContainer = $(".scrollList");
        var elem = 139; 
 	$.each(thisContainer, containMe);
        
 		// With variables set, let's get functioning
 	function containMe(){	
                // A little larger than article width
                var elemWidth = elem;
	 		// Get ID for list each time
	 	var thisId = $(this).children('ul').attr('id'); 
	 		// Use the id to find how many children the list has
	 	var contain =  $('#' + thisId).children().size();
	 		// Container size is the number of children times the width wanted for each
	 	var containSize = elemWidth * parseInt(contain, 10);
	 		// Make it so 
	 	$('#' + thisId).css('width', containSize);
                $(this).children('ul').css('left', 'auto');
	}
        
  // Gallery Slider
        $(".scrollList").before('<a href="#" class="arrow leftclick"><span class="screenRead">Left</span></a>').after('<a href="#" class="arrow rightclick"><span class="screenRead">right</span></a>').css({"display":"inline-block", "width":"80%", "overflow": "hidden"});
            var times = 1;
            var checkMe = 0;
        $(".arrow").click(function(e) {
            var thisScrollList = $(this).siblings('.scrollList');
            var viewPort = $(thisScrollList).width();
            var thisUl = $(thisScrollList).children('ul');
            var totalWidth = $(thisUl).width();
            var totalMovement = parseInt(totalWidth - viewPort); // Total amount of movement possible            
            var move = elem * times;
            if($(this).hasClass('rightclick') && totalMovement - checkMe > 0){
                   $(thisUl).css('right', move + 'px' );
                   if(totalMovement - checkMe > elem ){ // Only change times if there is still more room to move
                    times +=1 ; 
                   }                  
            } 
            if($(this).hasClass('leftclick') && checkMe > 0 ){  
                var newMove = move - elem; // Change movement to reflect single step back
                   $(thisUl).css('right', newMove + 'px' );  
                   times -=1 ; // Change times to prevent skipping when going right                  
            } 
            checkMe = parseInt($(thisUl).css('right'));
            e.preventDefault();
        });
  // Image Preload
  		// Set up the function
	$.preloadImages = function(){
			// Run through everything shoved into the function 
		for (var i = 0; i < arguments.length; i++){ 
			$("<img />").attr("src", arguments[i]); 
			} 
		}; 
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
  
  // Simulate checkbox reactions on Filter
  var countChecked = function() {
    var n = $( "input:checked" ).length;
    var searchNumber = 2037; // Should match results on page, should be pulled directly from server
    $("#filterResults" ).text(searchNumber - n*21 );
    $("#currentFilter").text(n);
    $('input').each(function(){
        var counterElem = $(this).parents(".content").prev('a').children('.chosen');
        var parentElem = $(this).parents(".content").attr('id');
        var l;
        if(parentElem === 'genre'){
            l = $("input.genre:checked").length;
        } else if(parentElem === 'char'){
            l = $("input.char:checked").length;
        } else if(parentElem === 'age'){
            l = $("input.age:checked").length;
        } else if(parentElem === 'year'){
            l = $("input.year:checked").length;
        } else if(parentElem === 'pricing'){
            l = $("input.pricing:checked").length;
        }
        $(counterElem).text(l);
    });            
  };  
      
  // When Filter opened, tally resultls  
  $( "input[type=checkbox]" ).on( "click", countChecked );
  $(document).on('open', '#filterOpt', function () { 
      countChecked();
  });
  // When Filter is closed, tally results and change search text 
  $(document).on('close', '[data-reveal]', function () {  
      $("#searchResults").text($("#filterResults" ).text());
      if(parseInt($('#currentFilter').text()) > 0, 10){
        $("#filtered").removeClass('hide');
      } else { $("#filtered").addClass('hide');}
  });
  // Escape Hatch
  $('a.close-reveal-modal').trigger('click');
     
 })(jQuery);
 
  	// Force Input into Link until server info can be used to populate real pages
  	function forceSearch(){
  		window.location="search.html";
  	}

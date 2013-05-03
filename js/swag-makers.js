$(document).ready(function() {
	/*$('#masthead').each(function(){
		$('#masthead-images img:eq(0)').show();
		setInterval($.animateFunc, 5000);
	});*/
	
	var images = ['dirtybeaches.jpg','yahama.jpg', 'real-estate.jpg', 'big-crowd.jpg', 'quilt.jpg', 'dustin-wong.jpg', 'self.jpg', 'flock-of-dimes.jpg'];
	$('#masthead-images').html('<img src="http://www.jimmy-morris.com/headunderwater/images/mastheads/' + images[Math.floor(Math.random() * images.length)] + '">');
	
	if($('.post-date a').attr('href') == '')
		$('.post-footer').hide();
		
	$('.image-set').each(function(){
		var el = $(this),
			rowsdata = el.attr('data-photoset-rows').split("");
		$(this).find('.photoset-photo').each(function(i){
			$(this).attr('data-index', (i+1));	
		});
		var wrap = {
			i:       0,
			oc: 0,
			hasNext: function() {
				return wrap.i < rowsdata.length;
			},
			next:   function() {
				return rowsdata[wrap.i++];
			}
		};
		while( wrap.hasNext() ) {
			st = wrap.i;			
			ed = parseInt(rowsdata[wrap.i]) + parseInt(st);						
			el.children().slice(st, ed).wrapAll('<div class="photosetRow cols' + rowsdata[wrap.i] + '"></div>');
			wrap.oc = ed;
			wrap.next();
		}
	});
	
	$(window).load(function(){
		$.responsivePhotoset();
	});
	
	//helping with the transition to proper html tagging from p > big to h1 > big
	$('p:has(big)').addClass('faux-h1');
	
});

$(window).resize(function(){
	$.responsivePhotoset();
});

$(function() { 	

	var bottomed = false;

	/*$(window).scroll(function() {
		if(!bottomed && $(window).scrollTop() + $(window).height() == $(document).height()) {
			bottomed = true;
			jQuery("body, html").animate({
					scrollTop: '+=214px'
				}, 
				500
			);
			$('.calisthenics').show().animate({height: '214px'}, 500, function(){ setTimeout($.collapseIt, 4000) });
		}
	});*/
	
	$('.post-content p img').each(function(){
		$(this).unwrap();	
	});
		
	$('.post-footer').each(function(){
		var share = $(this);
		$('.post-tags a', share).click(function(e){
			e.preventDefault();
			$('.tags', share).slideToggle(function(){
				twttr.widgets.load();
				FB.XFBML.parse();
			
			}, function(){
				//do nothing special
			});
			$(this).toggleClass('active');
		});
		
		$('.post-share a', share).click(function(e){
			e.preventDefault();
			$('.share-stuff', share).slideToggle(function(){
				twttr.widgets.load();
				FB.XFBML.parse();
			
			}, function(){
				//do nothing special
			});
			$(this).toggleClass('active');

		});
	});
	
	$('.photoset-photo').click(function(e){
		e.preventDefault();
		var imgIndex = $(this).attr('data-index'),
			galleryData = $(this).closest('.photoset').createSetInfo();
		Tumblr.Lightbox.init(galleryData, imgIndex)
	});

	
	$('.expandables > li > a').click(function(e){
		e.preventDefault();
		$(this).next().slideToggle();
		$(this).toggleClass('active');
	});
	
	$(".greatness-overlay .close").live("click", function(e){
		e.preventDefault();
		$(this).closest('.greatness-overlay').remove();
	});

	//hat tip to Chris Coyier aka css-tricks.com for this Fluid Width Video demo
	var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
    $fluidEl = $(".viddy");
	    	
	$allVideos.each(function() {
	
	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');
	
	});
	
	$(window).resize(function() {
	
	  var newWidth = $fluidEl.width();
	  $allVideos.each(function() {
	  
	    var $el = $(this);
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));
	  
	  });
	
	}).resize();

});

$.responsivePhotoset = function() {
	$('.photosetRow').each(function(){
		var theheights,
			el = $(this),
			minHeight = el.find('img').eq(0).height();
			maxHeight = 0;
		el.find('img').each(function() {
			maxHeight = Math.max($(this).height(), maxHeight);				
			minHeight = Math.min($(this).height(), minHeight);
		});
		el.find('a').each(function() {
			var e = $(this);
			e.height(minHeight);
			if(e.height() > minHeight)
				e.height(minHeight).find('img').css('margin-top',parseInt((-1)*(maxHeight - minHeight)/2));
		});
	});
};


$.fn.createSetInfo = function(){
	var status  = $(this);
    var photoset = []; //declare array

	status.find('img').each(function(i) {		
		photoset.push({
			"low_res": $(this).attr('src'),
			"high_res": $(this).parent().attr('href'),
			"caption": $(this).attr('alt')	
		});
	});
	
	return photoset;
};

$.animateFunc = function() {
	$('#masthead-images :first-child').fadeOut(500).next('img').fadeIn(1500).end().appendTo('#masthead-images');
}

$.collapseIt = function() {
	$('.calisthenics').animate({height: 0}, 500);
}

// some r kelly fun
var konami = [38,38,40,40,37,39,37,39,66,65], started = false, count = 0;
$(document).keydown(function(e){
	key = e.keyCode;
	if(!started){
		if(key == 38){
			started = true;
		}
	}
	if(started){
		if(konami[count] == key){
			count++;
		} else {
			$.oops();
		}
		if(count == 10){
			$('body').append('<div class="greatness-overlay"><div class="greatness"><iframe width="560" height="315" src="http://www.youtube.com/embed/zFosUj6A22c?autoplay=1" frameborder="0" allowfullscreen></iframe><p><a href="#" class="close">close</a></p></div></div>');
			//console.log('show it');
			setTimeout($.oops(), 500);
		}
	} else {
		$.oops();
	}
});
$.oops = function() {
	started = false; count = 0;
	return;
}

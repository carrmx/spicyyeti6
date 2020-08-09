//get a number between x and n
export function Nbetween(n, x) {
	return Math.floor(Math.random() * n) + x;	
}

//return random item from array
export function gashapon(machine) {

	return machine[Math.floor(Math.random() * machine.length)];
}

//flip site upsidedown
export function doAFlip() {
    let duration = parseFloat($('html').css('animation-duration'));
    
    //!!!GOTTA ADD THIS BACK
	$('html').css('animation-name', 'aFlip');
	
	setTimeout(function(){
	    $('html').animate({
	        top: $('#content').height()
	    });
	}, (duration * 1000) + 100 );
}

//this is to be used with loadDirectory() from ../functions.php 
export function parsePhpArray(data, spl="splitHere") {
	var files = data.split(spl);
	//filter creates a new array with all elements that pass the test 
	//i use it to prevent empty strings from getting into the array 
	files = files.filter(file => file != ""); 
	return files;
}

export function getUrl() {
	var parts = window.location.pathname.split('/');
	var url = parts[2];
	return url;
}

export function getDirectory() {
	var parts = window.location.pathname.split('/');
	var dir = parts[1];
	return dir;
}

export function isInViewport(element) {
	let elementTop = $(element).offset().top;
	let elementBottom = elementTop + $(element).outerHeight();

	let viewportTop = $(window).scrollTop();
	let viewportBottom = viewportTop + $(window).height();

	return elementBottom > viewportTop - 50 && elementTop < viewportBottom - 50;
};
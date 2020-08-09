/*IMPORTS*/
import { doAFlip } from './util.js';
import { gashapon } from './util.js';
import { isInViewport } from './util.js';

/*PUBLIC FUNCTIONS*/
//append menu items according to vp dimensions
export function birth(orientation="horizontally") {
		//console.log($('.bar').children().length);
		//console.log($('.item').width());
		var win_height = $(window).height();
		var win_width = $(window).width();
		var n_kids = $('.bar').children().length;
		var kid_width = $('.item').width();
		var birth;
		var extras = 1;
		
		if(orientation == "vertically" || win_width <= 900) {
			birth = win_height / kid_width - n_kids + extras;
		} else if (orientation == "horizontally") {
			birth = win_width / kid_width - n_kids + extras;
		} else {
			console.log("what");
		}
		
		for(let i = 0; i <= birth; i++) {
			$('.bar').append('<div class="item"></div>');
		}
		
		return;
}

//fill all visible items with MenuItems
export function populate() {
	$('.in_vp.item:not(.main)').each(function() {
		grafitti(this);
	});
	
	return;
}

//put a MenuItem in an item box
export function grafitti(item) {
	
	if(!$(item).has('img').length) {
		let fun = gashapon(miscShit); 
		
		if(fun.pic) {
			$(item).append('<img src="' + fun.pic + '">');
		}
		
		if (fun.portal) {
			if(fun.portal.includes('http')) {
				$(item).wrap($('<a>', {href: fun.portal, target: '_'}).addClass('portal'));
			} else {
				$(item).wrap($('<a>', {href: fun.portal}).addClass('portal'));
			}
		} else {
			$(item).wrap($('<a>'));
		}
		
		if (fun.title) {
			$(item).append($('<p/>', {
				"class": "tip",
				"text": fun.title
			}));
		}

		if (fun.func) {
			$(item).click(fun.func);
			$(item).css('cursor', 'pointer');
		}
	}

	return;
}

//determine if item is visible or not
export function flashlight() {
	$('.item').each(function() {
		if (isInViewport(this)) {
			$(this).addClass('in_vp');
		} else {
			//  Remove class
			$(this).removeClass('in_vp');
		}
	});
}

/*PRIVATE VARIABLES*/
//sub menu
var miscShit = [
	new MenuItem("navboob.png"),
	new MenuItem("navshock.png"),
	new MenuItem("naveyes.png"),
	new MenuItem("navanime.png"),
	new MenuItem("navpoop.png"),
	new MenuItem("navearth.png"),
	new MenuItem("navmouth.png"),
	new MenuItem("navhand.png"),
	new MenuItem("navcarmi.png"),
	new MenuItem("navham2.png", "https://moonboy.neocities.org/", "ham"),
	new MenuItem("navali.png", "http://www.alizawren.com/", "ali"),
	new MenuItem("navswagi.png", "https://www.youtube.com/playlist?list=PLcGic-n8EVRLaP5eHLwtsGdoFY0RHZ23q", "SWAGIMATION!!!"),
	new MenuItem("navcoolthings.png", "coolthings.html", "things i like"),
	new MenuItem("navphy101.png", "extraPhysicsDoodles.html", "doodles from physics 101"),
	new MenuItem("navcp.png", "https://clubpenguincccptv.wordpress.com/", "meet 9 year old me"),
	new MenuItem("navrat.png", "http://giantrat.net/", "giant rat?"),
	new MenuItem("navfash.png", "fp.html", "fashion photography (2015 i think)"),
	new MenuItem("navbgs.png", "backgrounds.html", "backgrounds"),
	new MenuItem("navupside.png", null, "?!?!?", doAFlip),
	new MenuItem("navpp.png", "perspectivePages/pP.html", "PEEPEE"),
	new MenuItem("navpowermation.png", "https://docs.google.com/presentation/d/1tC-BH3x3OF4rqW3RcbX8Vg5XUgil6Mp0BbMaN4P9qms/edit?usp=sharing", "I Heard You Like 132 Slide PowerPoints?"),
	new MenuItem("navneo.png", "https://neocities.org/site/spicyyeti/follows", "2019 NEOCITIES IS ABOUT TO E . X . P . L . O . D . E"),
	new MenuItem("navsword.png", "http://wizardkicks.com/", "THE SWORD WIZARD"),
	new MenuItem("navspace.png", "http://www.liminalspacecomics.com/", "liminal space")
];

/*PRIVATE FUNCTIONS*/
//create a menu item
function MenuItem(pic, portal, title, func) {
	//keep the absolute path for the sake of the story pages
	this.pic = "https://www.spicyyeti.com/img/" + pic;

	//if the link starts with "\", meaning if its is local
	if (portal) {
		if (portal.startsWith("\\"))
			this.portal = window.location.origin + portal;
		else
			this.portal = portal;
	}

	if (!title && portal) {
		//remove slash from beginning if its there
		if(/^\//.test(portal)) 
			this.title = /(^\/)(.*)/.exec(portal)[2];
	} else {
		this.title = title;
	}

	this.func = func;
}

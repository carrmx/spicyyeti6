//bind dropdown functionality
export function initDropdown(trigger) {
	var $dropdown;

	$(trigger + '+ .dropdown').each(function () {
		$(this).hide();
		$(this).attr('data-height', $(this).height()).height(0);
	});

	$(trigger).click(function() {
	   $dropdown = $(this).find('+ .dropdown');
	   if ($(this).hasClass('open')) {
		   $(this).removeClass('open');
		   $dropdown.animate({ height:'0' }, 400, "swing", function() {$(this).hide();});
	   } else {
		   expandDong($(this), $dropdown);
	   }
   });
}

//set data heights
export function dataHeights(trigger) {
	$(trigger + '+ .dropdown').each(function () {
		$(this).hide();
		$(this).attr('data-height', $(this).height()).height(0);
	});
	
	return;
}

//open a dropdown
export function expandDong($trigger, $dropdown) {
	$trigger.addClass('open');
	$dropdown.show().animate({ height: $dropdown.attr('data-height') }, 400, "swing");
}

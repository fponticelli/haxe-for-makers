$(function() {
	$('img[data-src]').each(function() {
		$(this).attr('src', "images/blank.gif");
	});

	$('#presentation').jmpress({});

	function enter() {
		var self = this;
		$('img[data-src]', self).each(function(_, iframe) {
			$(iframe).attr("src", $(iframe).attr("data-src"));
		});
		setTimeout(function() {
			$('iframe[data-src]', self).each(function(_, iframe) {
				$(iframe).attr("src", $(iframe).attr("data-src"));
			});
		}, 2000);
	}

	$('.step')
		.on('enterStep', enter)
		.on('leaveStep', function() {
			var self = this;
			setTimeout(function() {
				if(self === $('.active')[0])
					return;
				$('iframe[data-src],img[data-src]', self).each(function(_, iframe) {
					$(iframe).attr("src", "images/blank.gif");
				});
			}, 6000);
		});

	// random logo effect
	var $bg = $('body > div.bg'),
		mindelay = 1000,
		maxdelay = 8000,
		delay = maxdelay;
	function animate() {
		$bg.toggleClass('blur');
		setTimeout(animate, delay * Math.random());
		if(Math.random() < .2)
			delay = delay === maxdelay ? mindelay : maxdelay;
	}

	$('.step.active').each(enter);

	animate();
});
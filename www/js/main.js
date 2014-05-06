$(function() {
	$('#presentation').jmpress({});

	// random logo effect
	var $bg = $('body > div.bg'),
		effects = ['blur'],
		mindelay = 1000,
		maxdelay = 8000,
		delay = maxdelay;
	function animate() {
		var effect = effects[Math.floor(Math.random()*effects.length)];
		$bg.toggleClass(effect);
		setTimeout(animate, delay * Math.random());
		if(Math.random() < .2)
			delay = delay === maxdelay ? mindelay : maxdelay;
	}

	animate();
});
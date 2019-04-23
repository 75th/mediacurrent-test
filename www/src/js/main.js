var $ = document.querySelector.bind(document);

(function() {
	var $body = $('body');

	$body.classList.add('js');

	const modeShift = function(toDark) {
		// Transition duration is saved as a CSS custom property on the body element
		var transitionDuration = getComputedStyle($body).getPropertyValue('--transition-duration');
		const factor = transitionDuration.indexOf('ms') !== -1 ? 1 : 1000;
		transitionDuration = parseInt(transitionDuration) * factor;

		if(typeof toDark === 'undefined') {
			toDark = true;
		}

		// We don't want transitions on hover, but we do want them on mode change,
		// so here's a temporary class to enable transition durations
		$body.classList.add('mode-shifting')
		$body.classList.remove(toDark ? 'light' : 'dark');
		$body.classList.add(toDark ? 'dark' : 'light');
		setTimeout(
			function() { $body.classList.remove('mode-shifting') },
			transitionDuration
		);
	};

	$('button.to-dark').addEventListener('click', function() {
		modeShift(true);
	});

	$('button.to-light').addEventListener('click', function() {
		modeShift(false);
	});

	var darkModeMQ = matchMedia('(prefers-color-scheme: dark)');
	$body.addClass(darkModeMQ.matches ? 'dark' : 'light');
})();

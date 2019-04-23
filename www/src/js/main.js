var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

(function() {
	var $body = $('body');

	$body.classList.add('js');

	const modeShift = (toDark = true) => {
		// Transition duration is saved as a CSS custom property on the body element
		var transitionDuration = getComputedStyle($body).getPropertyValue('--transition-duration');
		const factor = transitionDuration.indexOf('ms') !== -1 ? 1 : 1000;
		transitionDuration = parseInt(transitionDuration) * factor;

		// Disable mode buttons during transition
		const $$buttons = $$('.color-modes button');
	//	$$buttons.forEach(($button) => { $button.disabled = true });

		// We don't want transitions on hover, but we do want them on mode change,
		// so here's a temporary class to enable transition durations
		$body.classList.add('mode-shifting');

		$body.classList.remove(toDark ? 'light' : 'dark');
		$body.classList.add(toDark ? 'dark' : 'light');
		setTimeout(
			() => {
				$body.classList.remove('mode-shifting')
			//	$$buttons.forEach(($button) => { $button.disabled = false });
			},
			transitionDuration
		);
	};

	$('button.to-dark').addEventListener('click', () => { modeShift(true); });

	$('button.to-light').addEventListener('click', () => { modeShift(false); });

	var darkModeMQ = matchMedia('(prefers-color-scheme: dark)');
	$body.classList.add(darkModeMQ.matches ? 'dark' : 'light');
})();

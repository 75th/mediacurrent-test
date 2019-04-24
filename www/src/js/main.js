var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

(() => {
	var $body = $('body');

	// Add buttons
	$('div.color-modes').innerHTML =
		'<button class="to-dark"><span>Dark Mode</button><button class="to-light"><span>Light Mode</span></button>'
	;

	// Keep track of whether the user has manually chosen a color scheme,
	// so we can stop monitoring the OS setting in the middle of a session.
	var manualColorMode = false;

	var colorModeSwitch = (toDark = true, manualSwitch = true, transition = manualSwitch) => {
		const transitionDuration = transition ? 500 : 0;
		const transitionDurationCSS = `${transitionDuration}ms`;

		if(manualSwitch) {
			manualColorMode = true;
			localStorage.setItem('prefersDark', toDark);
		}

		// Disable mode buttons during transition
		const $$buttons = $$('.color-modes button');
		$$buttons.forEach(($button) => { $button.disabled = true });

		$body.style.setProperty('--transition-duration', transitionDurationCSS);
		$body.classList.add('mode-shifting');

		$body.classList.remove(toDark ? 'light' : 'dark');
		$body.classList.add(toDark ? 'dark' : 'light');

		setTimeout(
			() => {
				$body.classList.remove('mode-shifting');
				$body.style.setProperty('--transition-duration', '0s');
				$$buttons.forEach(($button) => { $button.disabled = false });
			},
			transitionDuration
		);
	};

	$('button.to-dark').addEventListener('click', () => { colorModeSwitch(true); });
	$('button.to-light').addEventListener('click', () => { colorModeSwitch(false); });

	var prefersDark = localStorage.getItem('prefersDark');
	prefersDark = prefersDark === 'false' ? false : prefersDark === 'true' ? true : null;

	// Remember the last manual selection foreeeeeevvverrrrr
	if(prefersDark !== null) {
		colorModeSwitch(prefersDark, false);
	} else {
		// If no manual selection, use OS settings
		const darkModeMQ = matchMedia('(prefers-color-scheme: dark)');
		colorModeSwitch(darkModeMQ.matches, false);

		darkModeMQ.addListener((e) => {
			if(!manualColorMode) {
				colorModeSwitch(e.matches, false, true);
			}
		});
	}
})();
